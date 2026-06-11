import { cn } from "@/utils/cn";
import { AlertTriangle, CreditCard, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface SystemAlertsProps {
  flights: import("@/types").Flight[];
  bookings: any[];
}

const SystemAlerts = ({ flights, bookings }: SystemAlertsProps) => {
  const navigate = useNavigate();
  const lowSeatFlights = flights.filter((f) => f.hasLowSeats).length;
  const pendingRefunds = bookings.filter((b) => b.status === "pending_cancellation").length;

  const alerts = [
    {
      title: "Low Seats",
      description: `${lowSeatFlights} flight${lowSeatFlights !== 1 ? "s" : ""} nearly full (under 10 seats left)`,
      icon: AlertTriangle,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "border-amber-100",
      onClick: () => navigate(`${ROUTES.ADMIN_FLIGHTS}?sort=seats`),
    },
    {
      title: "Failed Payments",
      description: "Payment gateway coming soon",
      icon: CreditCard,
      color: "bg-rose-50",
      iconColor: "text-rose-600",
      borderColor: "border-rose-100",
      onClick: undefined,
    },
    {
      title: "Pending Refund",
      description: `${pendingRefunds} refund request${pendingRefunds !== 1 ? "s" : ""} pending approval`,
      icon: RefreshCcw,
      color: "bg-sky-50",
      iconColor: "text-sky-600",
      borderColor: "border-sky-100",
      onClick: () => navigate(`${ROUTES.ADMIN_BOOKINGS}?status=pending_cancellation`),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900 px-1">System Alerts</h3>
      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.title}
            className={cn(
              "flex items-start gap-4 rounded-2xl border p-4 transition-all hover:scale-[1.02]",
              alert.color,
              alert.borderColor,
            )}
          >
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm",
                alert.iconColor,
              )}
            >
              <alert.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
              <p className="mt-0.5 text-xs font-medium text-slate-600">{alert.description}</p>
              {alert.onClick && (
                <button
                  onClick={alert.onClick}
                  className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-900 hover:underline cursor-pointer"
                >
                  View Details →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemAlerts;
