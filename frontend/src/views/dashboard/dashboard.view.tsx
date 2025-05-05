import HistorySensorSection from "@/components/dashboard/history-sensor-section"
import SensorDataSection from "@/components/dashboard/realtime-sensor-section"

function DashboardView() {
	return (
		<div>
			<div className="flex items-center p-2 mb-4 justify-between">
				Trang chủ
			</div>
			<div className="flex gap-4">
				<SensorDataSection />
				<HistorySensorSection />
			</div>
		</div>
	)
}

export default DashboardView