import './App.css';
import { Avatar, Employees, Profile, Card, Children, ParentComponent, PackingList, List, RecipeList, Recipes, TeaSet, TeaSet02, TeaGathering, Counter } from './components/01-Describing-the-UI/index';

function App() {
  return (
    <div className="App">
      <Profile />
    <br />
    <Avatar />
    <br />
    <Employees />
    <br />
    <Card>
      <Children />
    </Card>
    <br />
    <ParentComponent />
    <PackingList />
    <List />
    <RecipeList />
    <h1>For two</h1>
    <Recipes drinkers={2} />
    <h1>For gathering</h1>
    <Recipes drinkers={6} />
    <br />
    <TeaSet />
    <TeaSet02 />
    <TeaGathering />
    <Counter />
    </div>
  );
}

export default App;
