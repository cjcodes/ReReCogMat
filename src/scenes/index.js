import asyncComponent from '../components/AsyncComponent';

export const Home = asyncComponent(() => import('./Home'));
export const LoginRegister = asyncComponent(() => import('./LoginRegister'));
export const FlowBuilder = asyncComponent(() => import('./FlowBuilder'));
