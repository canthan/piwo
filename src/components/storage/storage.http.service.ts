import { Stash, EmptyBatch } from './storage.types';
import { CommonStorageService } from './common.service';
import axios from 'axios';

export class StorageHttpService {

  constructor(private commonService: CommonStorageService = new CommonStorageService()) { }

  async getStorageData(user_id: number) {
    try {
      return await axios.get(`http://localhost:1337/api/v1.0/user_data/${user_id}`);
    }
    catch (error) {
      console.error(error);
    }
  }

  public async addStash(newStash: Stash, user_id: number, batch_id: number) {
    try {
      return await axios.post(
        `http://localhost:1337/api/v1.0/stashes/${user_id}/${batch_id}`,
        CommonStorageService.flattenItemsForRequest([newStash])
      );
    }
    catch (error) {
      console.error(error);
    }
  }

  public async updateStashes(stashes: Stash[], user_id: number, batch_id: number) {
    try {
      return await axios.put(
        `http://localhost:1337/api/v1.0/stashes/${user_id}/${batch_id}`,
        CommonStorageService.flattenItemsForRequest(stashes)
      );
    }
    catch (error) {
      console.error(error);
    }
  }

  public async deleteBatch(user_id: number, batch_id: number) {
    try {
      return await axios.delete(`http://localhost:1337/api/v1.0/batches/${user_id}/${batch_id}`);
    }
    catch (error) {
      console.error(error);
    }
  }

  public async addBatch(newBatch: EmptyBatch, user_id: number) {
    try {
      return await axios.post(
        `http://localhost:1337/api/v1.0/batches/${user_id}`,
        newBatch
      );
    }
    catch (error) {
      console.error(error);
    }
  }
}
