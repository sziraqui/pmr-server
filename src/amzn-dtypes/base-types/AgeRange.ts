export class AgeRange {
    /**
     * Age range between High and Low both having minimum 0
     * @param High - upper bound
     * @param Low - lower bound
     */
    constructor(public Low: number = 0, public High: number = 0) { }
}
