/* tslint:disable:max-classes-per-file */
export class LatestValue {
  public temperature: number;
  public humidity: number;
  public pressure: number;
  public lastUpdatedAt: number;
}

export class SensorLog {
  public value: object;
}

export class LoadingStatus {
  public isCurrentTempLoading: boolean;
  public isChartLoading: boolean;
}

export class FirebaseData {
  public loadingStatus: LoadingStatus;
  public latest: LatestValue;
  public sensorLog: SensorLog;
}
