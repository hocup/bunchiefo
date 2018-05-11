export interface IState {

    // Implementation should return some random neighbor of the state
    neighbor(): IState; 

    // Implementation should return the energy of the state
    energy(): number;
}