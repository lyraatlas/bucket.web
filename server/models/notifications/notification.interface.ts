import { mongoose } from '../../config/database/database';
import { Schema, Model, Document, model } from 'mongoose';
import { IBaseModel, IBaseModelDoc } from "../index";
import * as enums from "../../enumerations";
import { BijectionEncoder } from '../../utils/bijection-encoder';
import * as log from 'winston';
import { IBucketLikedNotification } from './bucket-related/bucket-liked.notification.interface';

export interface INotification extends IBaseModel {
    type: enums.NotificationType
    bucketLikedNotification: IBucketLikedNotification,
    // This field makes it easier to build our notification list.  in the supplier mobile app, and taki dashboard.
    relatedTo?: string,
    isRead?: boolean;
    readAt?: string;
    isActionable?: boolean;
    isActionCompleted?: boolean;
    isSystem?: boolean;
}

export interface INotificationDoc extends INotification, IBaseModelDoc {

}

export const NotificationSchema = new Schema({
    bucketLikedNotification: {
        bucket: { type: Schema.Types.ObjectId, ref: 'bucket' },
        likedBy: {type: Schema.Types.ObjectId, ref: 'user'},
    },
    // This could be supplier, courier, particular team member, or user.  We're going to keep this generic for now.
    relatedTo: { type: Schema.Types.ObjectId },
    type: { type: Number, enum: [enums.EnumHelper.getValuesFromEnum(enums.NotificationType)] },
    isRead: { type: Boolean, default: false },
    readAt: { type: String },
    isActionable: { type: Boolean },
    isActionCompleted: { type: Boolean },
    isSystem: { type: Boolean },
}, { timestamps: true });

// This will compile the schema for the object, and place it in this Instance.
export const Notification = mongoose.model<INotificationDoc>('notification', NotificationSchema);   