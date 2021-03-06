export type TFindAndCountResult<T> = [Array<T>, number];

export type TParams = {
  withDeleted?: boolean;
  hallplaneId?: number;
  prepayType?: number;
};
