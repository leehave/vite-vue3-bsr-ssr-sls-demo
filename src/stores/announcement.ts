import { Announcement } from '/@/interfaces/announcement'
import { PaginationList } from '/@/interfaces/common'
import { createFetchStore } from './_fetch'
import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'

export const useAnnouncementStore = defineStore('announcement', () => {
  return createFetchStore<Announcement[]>({
    data: [],
    preclean: true,
    async fetcher(params?: any) {
      const response = await nodepress.get<PaginationList<Announcement>>('/announcement', { params })
      return response.result.data
    }
  })
})
