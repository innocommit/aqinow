"use client";

import { useSensorRealtime } from '@/hooks/use-sensor'
import { Bubbles, Droplet, ShieldAlert, Smile, ThermometerSun } from 'lucide-react';
import React from 'react'
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

const colors: Record<string, string> = {
  "Tốt": "text-green-500",
  "Trung bình": "text-yellow-500",
  "Kém": "text-orange-500",
  "Xấu": "text-red-500",
  "Nguy hiểm": "text-red-800",
};

const bgColors: Record<string, string> = {
  "Tốt": "bg-green-100",
  "Trung bình": "bg-yellow-100",
  "Kém": "bg-orange-100",
  "Xấu": "bg-red-200",
  "Nguy hiểm": "bg-red-200",
};

function SensorDataSection() {
  const sensor = useSensorRealtime("/sensors");
  const data = sensor?.data ?? null;

  return (
    <div className="p-4 border rounded w-[350px]">
      <h2 className="text-sm font-bold mb-3">Dữ liệu đo được</h2>
      {data ? (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-1 bg-red-500 rounded-full">
              <p className="text-xs">Trực tiếp</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <ThermometerSun />
                <p className="text-xs font-bold">{data.t} độ C</p>
              </div>
              <div className="flex items-center gap-0.5">
                <Droplet />
                <p className="text-xs font-bold">{data.h} %</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold">{data.aqi}</span>
              <span className="text-xs text-gray-500">Chỉ số AQI</span>
            </div>
            <div className="flex items-center gap-2">
              <Smile className={cn(colors[data.aqiLevel] ?? "text-gray-400")} />
              <span className="text-xs font-bold">{data.aqiLevel}</span>
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-2 mb-5">
            <div className="flex gap-2 items-center">
              <span className="text-xs uppercase">Các chỉ số ô nhiễm</span>
              <Bubbles className="size-4" />
            </div>
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold">PM2.5 : </span>
                <span className="text-xs">{data.pm25} µg/m³ </span>
              </div>
              <Badge variant="default" className={cn(colors[data.pm25Level] ?? "text-gray-400", bgColors[data.pm25Level])}>
                <span>{data.pm25Level}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold">PM10 : </span>
                <span className="text-xs">{data.pm10} µg/m³ </span>
              </div>
              <Badge variant="default" className={cn(colors[data.pm10Level] ?? "text-gray-400", bgColors[data.pm10Level])}>
                <span>{data.pm10Level}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold">CO : </span>
                <span className="text-xs">{data.co} µg/m³ </span>
              </div>
              <Badge variant="default" className={cn(colors[data.coLevel] ?? "text-gray-400", bgColors[data.coLevel])}>
                <span>{data.coLevel}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold">SO2 : </span>
                <span className="text-xs">{data.so2} µg/m³ </span>
              </div>
              <Badge variant="default" className={cn(colors[data.so2Level] ?? "text-gray-400", bgColors[data.so2Level])}>
                <span>{data.so2Level}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold">NO2 : </span>
                <span className="text-xs">{data.no2} µg/m³ </span>
              </div>
              <Badge variant="default" className={cn(colors[data.no2Level] ?? "text-gray-400", bgColors[data.no2Level])}>
                <span>{data.no2Level}</span>
              </Badge>
            </div>
          </div>
          <div className="flex items-center mt-5 gap-2">
            <ShieldAlert />
            <p className="text-sm">Hãy ở nhà nhé</p>
          </div>
        </div>
      ) : (
        <p>Đang tải dữ liệu ...</p>
      )}
    </div>
  )
}

export default SensorDataSection;