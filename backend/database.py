from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, Text, ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class VideoAnalysis(Base):
    __tablename__ = "video_analyses"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    alert = Column(Boolean, default=False)
    people_detected = Column(Integer, default=0)
    message = Column(String)
    interactions = Column(Text)  # stored as JSON string
    pose_events = Column(Text)   # stored as JSON string
    total_frames = Column(Integer)
    processed_video = Column(String)
    snapshot = Column(String, nullable=True)
    yolo_detection_time = Column(Float, nullable=True)
    total_processing_time = Column(Float, nullable=True)
    timestamp = Column(Float)


def init_db():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()