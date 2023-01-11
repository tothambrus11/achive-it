export enum TargetType {
    TASK,
    COLLECT_MONEY,
    REACH_TARGET_1B1
}

interface CollectAmountExtraData {
    amountToCollect: number;
    currentAmount: number;
}

interface CollectMoneyExtraData extends CollectAmountExtraData {
}

interface ReachTarget1B1ExtraData extends CollectAmountExtraData {
}

export type ExtraTargetData = CollectMoneyExtraData | ReachTarget1B1ExtraData;

export interface Target {
    done: boolean;
    title: string;
    date?: string;
    details?: string;
    targetType: TargetType;
    extraData?: ExtraTargetData;
    children: Target[];
    calculatedProgress?: number;
}

export interface CollectMoneyTarget extends Target {
    targetType: TargetType.COLLECT_MONEY;
    extraData: CollectMoneyExtraData;
}

export interface ReachTarget1B1Target extends Target {
    targetType: TargetType.REACH_TARGET_1B1;
    extraData: ReachTarget1B1ExtraData;
}

export function calculateProgress(target: Target): number {
    if (target.children.length === 0) {
        if (target.targetType === TargetType.TASK) {
            return target.calculatedProgress = +target.done;
        } else if (target.targetType === TargetType.REACH_TARGET_1B1 || target.targetType === TargetType.COLLECT_MONEY) {
            let t = target as CollectMoneyTarget | ReachTarget1B1Target;
            return t.calculatedProgress = t.extraData.currentAmount / t.extraData.amountToCollect;
        }
        throw new Error("Unknown target type");
    } else {
        let progress = 0;
        target.children.forEach(child => {
            progress += calculateProgress(child);
        });
        return target.calculatedProgress = progress / target.children.length;
    }
}