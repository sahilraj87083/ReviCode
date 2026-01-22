import { useState } from "react";
import { Button, Input, Select } from "../";

function CreateContestModal({ open, onClose, collection, onSubmit }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    questionCount: 5,
    durationInMin: 60,
    visibility: "private",
  });

  if (!open || !collection) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await onSubmit({
      title: form.title,
      questionCount: Number(form.questionCount),      
      durationInMin: Number(form.durationInMin),      
      visibility: form.visibility,
      collectionId: collection._id,
    });

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            Create Contest
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            From collection:{" "}
            <span className="text-white font-medium">
              {collection.name}
            </span>
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Contest Title"
            name="title"
            placeholder="e.g. DSA Sprint"
            value={form.title}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Questions"
              type="number"
              name="questionCount"
              min={1}
              max={collection.questionsCount}
              value={form.questionCount}
              onChange={handleChange}
            />

            <Select
              label="Duration"
              name="durationInMin"
              value={form.durationInMin}
              onChange={handleChange}
              options={[
                { label: "30 min", value: 30 },
                { label: "60 min", value: 60 },
                { label: "90 min", value: 90 },
                { label: "120 min", value: 120 },
                { label: "150 min", value: 150 },
              ]}
            />
          </div>

          <Select
            label="Visibility"
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            options={[
              { label: "Private (Invite only)", value: "private" },
              { label: "Shared (With code)", value: "shared" },
              { label: "Public (Discoverable)", value: "public" },
            ]}
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              Create Contest
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateContestModal;
