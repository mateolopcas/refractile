import { Request, Response, NextFunction, RequestHandler } from 'express';
import Benchmark from '../db/Benchmark';
import { BenchmarkType } from '../../types';

export const benchmarkController = {
  postBenchmark: async (
    { body: { language, input, time } }: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newBenchmark: BenchmarkType = {
        language,
        input,
        time
      }
      await Benchmark.create(newBenchmark)
      console.log('Successfully added document to DB')
      return next();
    } catch (e: unknown) {
      return next({
        log: 'Failure in benchmarkController.postBenchmark -- ' + e,
        message: { err: 'Could not post new benchmark to database ' },
      });
    }
  }
}