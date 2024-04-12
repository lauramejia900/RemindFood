import { BrowserRouter, Route, Switch} from "react-router-dom"
import Enlatados from "./Componentes/paginas/Enlatados";
import Granos from "./Componentes/paginas/Granos"
import Carnes from "./Componentes/paginas/Carnes"
import Lacteos from "./Componentes/paginas/Lacteos"
import Cereales from "./Componentes/paginas/Cereales"
import Aseo from "./Componentes/paginas/Aseo"
import Parva from "./Componentes/paginas/Parva"
import Lista from "./Componentes/paginas/Lista";
import Nuevo from "./Componentes/paginas/Nuevo";
import Vencido from "./Componentes/paginas/Vencidos";
import Acabados from "./Componentes/paginas/Acabados";
import Editar from "./Componentes/paginas/Editar";
import Detalles from "./Componentes/paginas/Detalles";
import Detalles2 from "./Componentes/paginas/Detalles2";
import Mercado from "./Componentes/paginas/Mercado";
import LoginRegistro from "./Componentes/paginas/LoginRegistro";


const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route path="/login" render={() => <LoginRegistro></LoginRegistro>}></Route>
            <Route path="/" exact render={() =><Lista></Lista>}></Route>
            <Route path="/enlatados" exact render={() => <Enlatados></Enlatados>}></Route>
            <Route path="/granos" exact render={() => <Granos></Granos>}></Route>
            <Route path="/carnes" exact render={() => <Carnes></Carnes>}></Route>
            <Route path="/lacteos" exact render={() =><Lacteos></Lacteos>}></Route>
            <Route path="/cereales" exact render={() => <Cereales></Cereales>}></Route>
            <Route path="/parva" exact render={() => <Parva></Parva>}></Route>
            <Route path="/aseo" exact render={() => <Aseo></Aseo>}></Route>
            <Route path="/nuevo" exact render={() => <Nuevo></Nuevo>}></Route>
            <Route path="/vencer" exact render={() => <Vencido></Vencido>}></Route>
            <Route path="/mercado" exact render={() => <Mercado></Mercado>}></Route>
            <Route path="/acabarse" exact render={() => <Acabados></Acabados>}></Route>
            <Route path="/product/editar/:id" exact render={() => <Editar></Editar>}></Route>
            <Route path="/product/detalles/:id" exact render={() => <Detalles></Detalles>}></Route>
            <Route path="/product/detalles2/:id" exact render={() => <Detalles2></Detalles2>}></Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
