import { Stash, EmptyBatch } from './storage.types';
import { CommonStorageService } from './common.service';
import axios from 'axios';

export class StorageHttpService {
  constructor(
    private commonService: CommonStorageService = new CommonStorageService()
  ) {}
}
