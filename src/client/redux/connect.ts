import { RootStore } from 'client/redux'
import {
  connect as _connect,
  InferableComponentEnhancer,
  InferableComponentEnhancerWithProps,
  MapStateToPropsParam
} from 'react-redux'
import { Dispatch as _Dispatch } from 'redux'

// -----------------------------
// --- REDUX CONNECT HELPERS ---
// -----------------------------

export type Dispatch = _Dispatch

export interface DispatchProps {
  dispatch: Dispatch
}

interface Connect {
  (): InferableComponentEnhancer<DispatchProps>

  <TStateProps, TOwnProps = {}>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, RootStore>
  ): InferableComponentEnhancerWithProps<TStateProps & DispatchProps, TOwnProps>
}

export const connect: Connect = ((mapStateToProps: any) =>
  _connect(mapStateToProps)) as any
