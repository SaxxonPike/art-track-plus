import AppRecord from "../features/databases/app-record";

export default interface Artist extends AppRecord {
    badgeNumber?: string
    tableNumber?: string
    roomNumber?: string
    phone?: string
    remarks?: string
    lotteryEligible?: boolean
    lotteryGuaranteed?: boolean
    lotteryOrder?: number
    seatedLast?: string
    seatedDays?: string
    standbyDays?: string
    standbyOrder?: number
}