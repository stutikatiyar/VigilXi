import time


class PerformanceMetrics:

    def __init__(self):
        self.timings = {}
        self.start_times = {}
        self.total_start = time.time()

        # ---------- NEW METRICS ----------
        self.frames_read = 0
        self.frames_processed = 0
        self.alerts_generated = 0
        self.snapshots_generated = 0
        # -------------------------------

    def start(self, stage: str):
        self.start_times[stage] = time.time()

    def stop(self, stage: str):
        if stage in self.start_times:
            elapsed = time.time() - self.start_times[stage]

            if stage in self.timings:
                self.timings[stage] += elapsed
            else:
                self.timings[stage] = elapsed

    def finish(self):
        self.timings["total_processing"] = round(
            time.time() - self.total_start,
            3
        )

    def get_metrics(self):

        metrics = {
            k: round(v, 3)
            for k, v in self.timings.items()
        }

        # ---------- NEW CALCULATED METRICS ----------
        metrics["frames_read"] = self.frames_read
        metrics["frames_processed"] = self.frames_processed
        metrics["frames_skipped"] = (
            self.frames_read - self.frames_processed
        )

        if self.frames_processed > 0:
            metrics["average_yolo_per_frame"] = round(
                self.timings.get("yolo_detection", 0)
                / self.frames_processed,
                3
            )
        else:
            metrics["average_yolo_per_frame"] = 0

        if self.timings.get("total_processing", 0) > 0:
            metrics["processing_fps"] = round(
                self.frames_processed
                / self.timings["total_processing"],
                2
            )

            metrics["yolo_runtime_percent"] = round(
                (
                    self.timings.get("yolo_detection", 0)
                    / self.timings["total_processing"]
                )
                * 100,
                2
            )
        else:
            metrics["processing_fps"] = 0
            metrics["yolo_runtime_percent"] = 0

        metrics["alerts_generated"] = self.alerts_generated
        metrics["snapshots_generated"] = self.snapshots_generated
        # -------------------------------------------

        return metrics