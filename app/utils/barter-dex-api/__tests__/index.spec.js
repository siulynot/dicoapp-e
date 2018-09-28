import BarterDexAPI from '../index2';

describe('utils/barter-dex-api/index', () => {
  it('should create the BarterDexAPI correctly', () => {
    expect(typeof BarterDexAPI.publicCall).toEqual('function');
    expect(typeof BarterDexAPI.privateCall).toEqual('function');
    expect(typeof BarterDexAPI.swapstatus).toEqual('function');
    expect(typeof BarterDexAPI.setUserpass).toEqual('function');
    expect(typeof BarterDexAPI.getUserpass).toEqual('function');
    expect(typeof BarterDexAPI.resetUserpass).toEqual('function');
  });
});
