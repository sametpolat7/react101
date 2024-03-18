import './App.css';
import { MockForm1, StoryBooks, Form, HotelFeedBack, Accordion, NewAccordion, Base, Base1, Break, Scoreboard, Scoreboard1, Scoreboard2, Chat, TaskApp, NewTaskApp, Page } from './components/03-Managing-State';


function App03() {
    return(
        <div className='App03'>
            <MockForm1 />
            <StoryBooks />
            <Form />
            {/* <RedDot /> */}
            <HotelFeedBack />
            <Accordion />
            <NewAccordion />
            <Base />
            <br /> <hr />
            <Base1 />
            <br /> <hr />
            <Break />
            <br /> <hr />
            <Scoreboard />
            <br /> <hr />
            <Scoreboard1 />
            <br /> <hr />
            <Scoreboard2 />
            <br /> <hr />
            <Chat />
            <br /> <hr />
            <TaskApp />
            <br /> <hr />
            <NewTaskApp />
            <Page />
        </div>
    )
}

export default App03;