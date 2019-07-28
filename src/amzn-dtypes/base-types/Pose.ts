export class Pose {
    /**
     * Pose described by angle of pitch, roll and yaw axes.
     * Each value must be within [-180,180] degrees.
     * @param Pitch 
     * @param Roll 
     * @param Yaw 
     */
    constructor(public Pitch: number = 0, public Roll: number = 0, public Yaw: number = 0) { }
}
