import { GetListParams } from '@refinedev/core'
import dataProvider from '@refinedev/simple-rest'
import axiosInstance from './axiosInstance'

const API_URL = 'http://localhost:3001'
const baseDataProvider = dataProvider(API_URL, axiosInstance)

function convertDateFields(record: any): any {
  const newRecord = { ...record }
  Object.keys(newRecord).forEach((key) => {
    if (/(?:createdAt|updatedAt|startDate|endDate)(?:_(?:gte|lte))?$/.test(key) && newRecord[key]) {
      newRecord[key] = new Date(newRecord[key]).toLocaleString()
    }
  })
  return newRecord
}

export const customDataProvider = {
  ...baseDataProvider,
  getList: async (params: GetListParams) => {
    const response = await baseDataProvider.getList(params)
    const transformedData = response.data.map((record: any) => convertDateFields(record))
    return { ...response, data: transformedData }
  },
}
