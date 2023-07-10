"use client";
import { useEffect, useState } from "react"
const API_URL = '/api'
export default function Home() {
  const res = {
    thoiGian: '',
    nhietDo: '',
    anhSang: '',
    doAm: '',
    TDS: '',
    fresh: '',
  }
  const [env, setEnv] = useState(res)
  async function GetData() {
    return await (await fetch(API_URL, {
      mode: 'cors',
      method: 'GET',
      headers: { Origin: window.location.origin, }
    })).json()
  }
  useEffect((
  ) => {
    let timeId = setInterval(async () => {
      let data = await GetData();
      setEnv({
        thoiGian: data.ts,
        nhietDo: data.environment[0] + "°C",
        anhSang: data.environment[2],
        doAm: data.environment[1] + "%",
        TDS: data.environment[3],
        fresh: data.resultPrediction,
      })
    }, 5000)
  }, [])
  useEffect(() => {
    (async () => {
      let data = await GetData();
      setEnv({
        thoiGian: data.ts,
        nhietDo: data.environment[0] + "°C",
        anhSang: data.environment[2],
        doAm: data.environment[1] + "%",
        TDS: data.environment[3],
        fresh: data.resultPrediction,
      })
    })()
  }, [])
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-200">
      <div className="shadow-lg bg-white p-4 text-gray-800 rounded-2xl overflow-hidden text-clip"><h1 className="font-bold">Chỉ số môi trường</h1><p className="max-h-[200px] min-w-[350px] max-w-[350px]"></p></div>
      <div className="p-4 bg-white shadow-xl rounded-2xl mt-3">
        <div className="min-w-[350px]">
          <div className="flex items-center mb-4">
            <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="time">Thời gian:</label>
            <span className="bg-gray-200 py-2 px-3 text-gray-700 rounded">{env.thoiGian ? new Date(env.thoiGian).toLocaleString() : ''}</span>
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="temperature">Nhiệt độ:</label>
            <span className="bg-gray-200 py-2 px-3 text-gray-700 rounded">{env.nhietDo}</span>
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="light">Ánh sáng:</label>
            <span className="bg-gray-200 py-2 px-3 text-gray-700 rounded">{env.anhSang}</span>
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="humidity">Độ ẩm:</label>
            <span className="bg-gray-200 py-2 px-3 text-gray-700 rounded">{env.doAm}</span>
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="solution">Độ dung dịch:</label>
            <span className="bg-gray-200 py-2 px-3 text-gray-700 rounded">{env.TDS}</span>
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="prediction">Kết quả dự đoán tình trạng:</label>
            <span className="bg-gray-200 py-2 px-3 text-gray-700 rounded">{env.fresh}</span>
          </div>
        </div>
      </div>
    </main>



  )
}
