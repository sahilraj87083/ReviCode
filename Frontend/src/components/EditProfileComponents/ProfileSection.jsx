import { useUserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { Input } from '../'

function ProfileSection({ onOpenUpload, updateDetails}) {
    const { user } = useUserContext();
    const [fullName, setFullName] = useState(user.fullName || "");
    const [bio, setBio] = useState(user.bio || "");
    const [loading, setLoading] = useState(false);

    const HandleSave = async () => {
        if (loading) return;
        await updateDetails({ fullName, bio });
        toast.success("Profile updated");
        setLoading(false);
    };
    const changeDetected = fullName != user.fullName || bio != user.bio 

    return (
        <div className="space-y-6">

            {/* Cover */}
            <div
                className="h-40 bg-slate-800 rounded-xl relative bg-cover bg-center"
                style={{
                backgroundImage: user.coverImage?.url
                    ? `url(${user.coverImage.url})`
                    : "none"
                }}
            >
                <button
                onClick={() => onOpenUpload("coverImage")}
                className="absolute bottom-2 right-2 text-sm bg-black/50 px-3 py-1 rounded"
                >
                Change cover
                </button>
            </div>

            {/* Avatar */}
            <div className="-mt-10 flex items-center gap-4">
                <div onClick={() => onOpenUpload("avatar")}
                className="w-24 h-24 rounded-full border-4 border-slate-900 relative overflow-hidden bg-slate-700">
                {user.avatar?.url && (
                    <img
                        src={user.avatar.url}
                        className="w-full h-full object-cover"
                        alt="avatar"
                    />
                )}

                <button
                    className="absolute bottom-0 right-0 bg-black/70 p-1 rounded-full text-xs"
                >
                    ✎
                </button>
                </div>

                <div>
                <h2 className="text-xl font-bold">{user.username}</h2>
                </div>
            </div>

            <div className="space-y-3">
                <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-800 p-3 rounded"
                placeholder="Full name"
                />

                <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-800 p-3 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Bio"
                />
            </div>

            <button
                hidden ={!changeDetected}
                onClick={HandleSave}
                disabled={loading}
                className="bg-red-600 px-6 my-4 py-2 rounded"
            >
               {loading ? "Saving..." : "Save"}
            </button>

        </div>
    );
}

export default ProfileSection;
