from pydantic import BaseModel, Field


class SensorData(BaseModel):
    """
    Sensor data schema
    """

    t: float = Field(..., description="Temperature in Celsius")
    h: float = Field(..., description="Humidity in percentage")
    pm25: float = Field(..., description="PM2.5 concentration in µg/m³")
    pm10: float = Field(..., description="PM10 concentration in µg/m³")
    co: float = Field(..., description="CO2 concentration in ppm")
    so2: float = Field(..., description="SO2 concentration in ppm")
    no2: float = Field(..., description="NO2 concentration in ppm")
    aqi: float | None = Field(
        None, description="Air Quality Index (AQI) value, call llm to get the level"
    )
    aqi_level: str | None = Field(
        None, description="Air Quality Index (AQI) level, call llm to get the level"
    )
    t_level: str | None = Field(
        None, description="Temperature level, call llm to get the level"
    )
    h_level: str | None = Field(
        None, description="Humidity level, call llm to get the level"
    )
    pm25_level: str | None = Field(
        None, description="PM2.5 level, call llm to get the level"
    )
    pm10_level: str | None = Field(
        None, description="PM10 level, call llm to get the level"
    )
    co_level: str | None = Field(
        None, description="CO2 level, call llm to get the level"
    )
    so2_level: str | None = Field(
        None, description="SO2 level, call llm to get the level"
    )
    no2_level: str | None = Field(
        None, description="NO2 level, call llm to get the level"
    )
    recommendation: str | None = Field(
        None, description="Recommendation based on the sensor data, call llm to get the recommendation"
    )