// @flow 
import * as React from 'react';
type Props = {
    
};
const SubPagina = (props: Props) => {
    const [count, setCount] = React.useState(0);
    return (
        <h1>
            Sub Página
            <button onClick={(event) => setCount(count+1)}>Botao</button>
            {count}
        </h1>
    );
};

export default SubPagina