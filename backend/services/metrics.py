import time


class PerformanceMetrics:

    def __init__(self):
        self.timings = {}
        self.start_times = {}
        self.total_start = time.time()

    def start(self, stage: str):
        self.start_times[stage] = time.time()

    def stop(self, stage: str):
        if stage in self.start_times:
            elapsed = time.time() - self.start_times[stage]
            if stage in self.timings:
                self.timings[stage] += elapsed  # ACCUMULATE across frames
            else:
                self.timings[stage] = elapsed

    def finish(self):
        self.timings["total_processing"] = round(time.time() - self.total_start, 3)

    def get_metrics(self):
        return {k: round(v, 3) for k, v in self.timings.items()}