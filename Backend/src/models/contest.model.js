import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
    {
        contestCode: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        questionIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],

        durationInMin: {
            type: Number,
            required: true,
        },

        startsAt: Date,
        endsAt: Date,

        visibility: {
            type: String,
            enum: ["private", "shared", "public"],
            default: "private",
        },

        status: {
            type: String,
            enum: ["upcoming", "live", "ended"],
            default: "upcoming",
        },
    },
    { timestamps: true }
);


contestSchema.index({ endsAt: 1 });

// contestSchema.pre("save" , function () {
//     if (!this.startsAt) {
//         this.startsAt = new Date();
//     }

//     // Contest expires after 7 days
//     if (!this.endsAt) {
//         this.endsAt = new Date(
//             this.startsAt.getTime() + 7 * 24 * 60 * 60 * 1000
//         );
//     }

// })

contestSchema.pre("save", function () {
  // Only for new contests
  if (this.isNew) {
    this.status = "upcoming";
  }
});


contestSchema.statics.expireContests = async function () {
    
    await this.updateMany(
        { status: "live", endsAt: { $lte: new Date() } },
        { $set: { status: "ended" } }
    );
};

export const Contest = mongoose.model("Contest", contestSchema);
