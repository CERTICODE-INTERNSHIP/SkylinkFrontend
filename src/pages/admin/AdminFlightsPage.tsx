import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFlight } from "@/api/flights.api";
import { useFlights } from "@/hooks/useFlights";
import Button from "@/pages/_shared/components/ui/Button";
import DataTable, { type TableColumn } from "@/pages/_shared/components/ui/DataTable";
import Input from "@/pages/_shared/components/ui/Input";
import Modal from "@/pages/_shared/components/ui/Modal";
import StatusBadge from "@/pages/_shared/components/ui/StatusBadge";
import { flightSchema, type FlightFormValues } from "@/validation/flight.schemas";
import type { Flight } from "@/types";

const AdminFlightsPage = () => {
  const { data: flights, isLoading, refetch } = useFlights();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FlightFormValues>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      status: "scheduled",
      stops: 0,
      seatsAvailable: 150,
      cabinClass: "economy",
    },
  });

  const onSubmit = async (data: FlightFormValues) => {
    setServerError(null);
    try {
      await createFlight(data as Partial<Flight>);
      setIsModalOpen(false);
      reset();
      refetch();
    } catch (err: any) {
      setServerError(err.message || "Failed to create flight");
    }
  };

  const columns: TableColumn<Flight>[] = [
    {
      key: "flightNumber",
      header: "Flight #",
      cell: (row) => <span className="font-bold">{row.flightNumber}</span>,
    },
    {
      key: "route",
      header: "Route",
      cell: (row) => (
        <span>
          {row.origin} → {row.destination}
        </span>
      ),
    },
    {
      key: "airline",
      header: "Airline",
      cell: (row) => <span>{row.airline}</span>,
    },
    {
      key: "price",
      header: "Price",
      cell: (row) => <span>₱{row.price.toLocaleString()}</span>,
    },
    {
      key: "seats",
      header: "Seats",
      cell: (row) => <span>{row.seatsAvailable}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge label={row.status || "scheduled"} />,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Flight Management</h1>
          <p className="text-slate-500">Manage your flight inventory and schedules.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add Flight</Button>
      </div>

      <DataTable
        columns={columns}
        rows={flights || []}
        rowKey={(row) => row.id}
        emptyState={
          isLoading ? (
            <div className="py-10">Loading flights...</div>
          ) : (
            <div className="py-10">No flights found. Add your first flight!</div>
          )
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Flight"
        description="Fill in the details below to add a new flight to the system."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {serverError && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Flight Number"
              placeholder="e.g. SL-101"
              error={errors.flightNumber?.message}
              {...register("flightNumber")}
            />
            <Input
              label="Airline"
              placeholder="e.g. SkyLink"
              error={errors.airline?.message}
              {...register("airline")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Origin"
              placeholder="e.g. MNL"
              error={errors.origin?.message}
              {...register("origin")}
            />
            <Input
              label="Destination"
              placeholder="e.g. CEB"
              error={errors.destination?.message}
              {...register("destination")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Departure Time"
              type="datetime-local"
              error={errors.departureTime?.message}
              {...register("departureTime")}
            />
            <Input
              label="Arrival Time"
              type="datetime-local"
              error={errors.arrivalTime?.message}
              {...register("arrivalTime")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₱)"
              type="number"
              error={errors.price?.message}
              {...register("price")}
            />
            <Input
              label="Seats Available"
              type="number"
              error={errors.seatsAvailable?.message}
              {...register("seatsAvailable")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Cabin Class</label>
              <select
                className="px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register("cabinClass")}
              >
                <option value="economy">Economy</option>
                <option value="premium_economy">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Status</label>
              <select
                className="px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register("status")}
              >
                <option value="scheduled">Scheduled</option>
                <option value="on_time">On Time</option>
                <option value="delayed">Delayed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create Flight
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminFlightsPage;
