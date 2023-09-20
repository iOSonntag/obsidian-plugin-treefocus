import { P } from 'src/core/plugin';
import { Log } from 'src/util/logger';
import * as deepmerge from 'deepmerge';
import { ErrorHelper } from 'src/util/error-helper';





export abstract class PluginDataStore {


  private static _data?: Record<string, any>;


  /**
   * Initializes the data store by loading the data from the file system and
   * storing it in memory.
   * 
   * If `defaultData` is provided, it will be deeply merged with the data from
   * the file system. The data from the file system will overwrite the default
   * data.
   */
  static async init(defaultData: Record<string, any> | null): Promise<void>
  {
    Log.log('loading plugin data store');
    Log.debug('default data', defaultData);

    let storedData = await P.plugin.loadData();

    let data = defaultData ? defaultData : {};
    this._data = storedData ? deepmerge(data, storedData) : data;

    Log.debug('done loading plugin data store', this._data);
  }


  /**
   * Returns `true` if the data store is fully initialized.
   * 
   * Basically that means that the data is read from the file system and stored
   * in memory. 
   */
  static get initialized(): boolean
  {
    return !!this._data;
  }

  /**
   * Stores the given data in the data store and saves it to the file system.
   * 
   * Optionally pass `merge = true` to deeply merge the data with any existing
   * data (if existent).
   */
  public static async set(key: string, data: any, merge: boolean = false): Promise<void>
  {
    Log.debug('storing data', key, data);
    Log.debug('merge', merge);

    if (!this._data)
    {
      throw ErrorHelper.pluginBug('Data store is not initialized.');
    }

    if (merge && this._data[key])
    {
      data = data ? deepmerge(this._data[key], data) : this._data[key];

      Log.debug('merged data', data);
    }

    this._data[key] = data;

    await P.plugin.saveData(this._data);
  }


  /**
   * Stores the given data in the data store and saves it to the file system.
   * 
   * Optionally pass `merge = true` to deeply merge the data with any existing
   * data (if existent).
   */
  public static async setAll(data: Record<string, any>, merge: boolean = false): Promise<void>
  {
    Log.debug('storing all data', data);
    Log.debug('merge', merge);

    if (!this._data)
    {
      throw ErrorHelper.pluginBug('Data store is not initialized.');
    }

    if (merge)
    {
      data = data ? deepmerge(this._data, data) : this._data;

      Log.debug('merged data', data);
    }

    this._data = data;

    await P.plugin.saveData(this._data);
  }

  /**
   * Returns the data stored under the given key.
   */
  public static get(key: string): any
  {
    Log.debug('get value from data store', key);

    if (!this._data)
    {
      throw ErrorHelper.pluginBug('Data store is not initialized.');
    }

    let data = this._data[key];

    Log.debug('got data', data);

    return data;
  }

  /**
   * Returns the data stored under the given key. The data is expected to be a
   * string. If it is not a string or empty, an error is thrown.
   * 
   * Use {@link PluginDataStore.get} if you want to get any data type or expect empty data.
   */
  public static getStringOrThrow(key: string): string
  {
    Log.debug('get string from data store', key);
    let value = this.get(key);

    if (typeof value !== 'string' || value === '')
    {
      throw ErrorHelper.pluginBug(`Value for key '${key}' is not a string or empty.`);
    }

    Log.debug('got string', value);

    return value;
  }

  /**
   * Returns all data of the data store.
   */
  public static getAll(): Record<string, any>
  {
    Log.debug('get all data from data store');

    if (!this._data)
    {
      throw ErrorHelper.pluginBug('Data store is not initialized.');
    }

    return this._data;
  }

}