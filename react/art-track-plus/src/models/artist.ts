export default interface Artist {
    id?: number
    name?: string
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