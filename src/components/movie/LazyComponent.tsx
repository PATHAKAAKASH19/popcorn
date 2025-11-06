
import {Suspense , type ComponentType} from "react"
import Loading from "./Loading";


interface LazyComponentProps {
  component: ComponentType;
}


const LazyComponent: React.FC<LazyComponentProps> = ({ 
  component: Component 
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default LazyComponent