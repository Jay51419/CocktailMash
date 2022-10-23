export enum Extrapolate {
    extend,
    clamp,
    identity,
}

export function interpolate(
    value: number, {
        inputRange,
        outputRange,
        extrapolate,
        extrapolateLeft,
        extrapolateRight,
    }: { inputRange: number[], outputRange: number[], extrapolate?: Extrapolate, extrapolateLeft?: Extrapolate, extrapolateRight?: Extrapolate }): number {

    if (value < inputRange[0]) {
        if (_getExtrapolate(extrapolate, { left: extrapolateLeft }) ==
            Extrapolate.identity) {
            return value;
        }

        if (_getExtrapolate(extrapolate, { left: extrapolateLeft }) ==
            Extrapolate.clamp) {
            return outputRange[0];
        }

        if (inputRange[1] - inputRange[0] == 0) {
            return outputRange[0];
        }

        return outputRange[0] +
            (value - inputRange[0]) /
            (inputRange[1] - inputRange[0]) *
            (outputRange[1] - outputRange[0]);
    }

    if (value > inputRange[inputRange.length - 1]) {
        if (_getExtrapolate(extrapolate, { right: extrapolateRight }) ==
            Extrapolate.identity) {
            return value;
        }

        if (_getExtrapolate(extrapolate, { right: extrapolateRight }) ==
            Extrapolate.clamp) {
            return outputRange[outputRange.length - 1];
        }

        if (outputRange[outputRange.length - 1] -
            outputRange[outputRange.length - 2] ==
            0) {
            return outputRange[outputRange.length - 1];
        }

        return outputRange[outputRange.length - 1] +
            (value - inputRange[inputRange.length - 1]) /
            (inputRange[inputRange.length - 1] -
                inputRange[inputRange.length - 2]) *
            (outputRange[outputRange.length - 1] -
                outputRange[outputRange.length - 2]);
    }

    for (let i = 0; i < inputRange.length - 1; i++) {
        if (inputRange[i] <= value && value < inputRange[i + 1]) {
            if (outputRange[i + 1] - outputRange[i] == 0) {
                return outputRange[i];
            }

            return outputRange[i] +
                (value - inputRange[i]) /
                (inputRange[i + 1] - inputRange[i]) *
                (outputRange[i + 1] - outputRange[i]);
        }
    }

    return 0.0;
}

function _getExtrapolate(
    extrapolate: Extrapolate | undefined, {
        left,
        right,
    }: { left?: Extrapolate, right?: Extrapolate }): Extrapolate {
    if (extrapolate != null) {
        return extrapolate;
    }

    if (left != null) {
        return left;
    }

    if (right != null) {
        return right;
    }

    return Extrapolate.extend;
}