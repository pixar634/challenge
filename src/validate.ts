'use strict';

export const validateFunc = ({ User }) => {
    return async _user => {
        try {
            let user = await User.findOne({ _id: _user._id });
            if (!user) return { isValid: false };
            await User.updateOne({ _id: _user._id }, { $set: { last_seen: new Date() } });
            return { isValid: true };
        } catch (err) {
            return { isValid: false };
        }
    };
};

