import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImageDropzone({ onSelect, preview }) {
    const onDrop = useCallback((files) => {
        if (!files.length) return;
        const file = files[0];
        if (!file.type.startsWith("image/")) return;
        onSelect(file);
    }, [onSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1
    });

    return (
        <div
        {...getRootProps()}
        className={`h-[400px] w-[600px] flex justify-center items-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragActive ? "border-red-500 bg-red-500/10" : "border-slate-600"}
        `}
        >
        <input {...getInputProps()} />
        {preview ? (
            <img
            src={preview}
            className="mx-auto max-h-60 rounded object-cover"
            />
        ) : (
            <p className="text-slate-400">
            Drag & drop image here or click to select
            </p>
        )}
        </div>
    );
}

export default ImageDropzone;
