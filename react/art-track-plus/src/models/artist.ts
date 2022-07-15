class Artist {

    constructor(obj: any) {
        if (!obj) {
            return;
        }

        [
            this.id,
            this.name,
            this.badgeNumber,
            this.tableNumber,
            this.roomNumber,
            this.phone,
            this.remarks,
            this.lotteryEligible,
            this.lotteryGuaranteed,
            this.lotteryOrder,
            this.seatedLast,
            this.seatedDays,
            this.standbyDays,
            this.standbyOrder
        ] = obj;
    }

    id: number;
    name: string;
    badgeNumber: string;
    tableNumber: string;
    roomNumber: string;
    phone: string;
    remarks: string;
    lotteryEligible: boolean;
    lotteryGuaranteed: boolean;
    lotteryOrder: number;
    seatedLast: string;
    seatedDays: string[];
    standbyDays: string[];
    standbyOrder: number;

    checkForErrors(): string[] {
        const result = [];
        if (!this.name) {
            result.push("Name is empty");
        }
        if (!this.badgeNumber) {
            result.push("Badge number is empty");
        }
        return result;
    }
}

export default Artist;