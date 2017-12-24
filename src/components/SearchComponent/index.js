import React, { Component } from 'react';
import Mansory from 'react-masonry-component';
import BackgroundComponent from '../BackgroundComponent'
import NavigationComponent from "../NavigationComponent";
import {Input,Card,CardBody,CardTitle,CardSubtitle,CardText,Button} from 'reactstrap';

import './layout.css';

var masonryOptions = {
    transitionDuration: 0
};

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridContent : []
        }
        this.getData = this.getData.bind(this)
    }

    componentDidMount(){
       this.getData();
    }

    getData(){
        let text = [],
            i;

        for (i = 0; i < 100; i++) {
            text.push(
                     <div>
                         <Card>
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                             </CardBody>
                        </Card>
                    </div>
            );
        }

        this.setState({
            gridContent : text
        })
    }



    render() {
        return (
            <div>
                <div className="shell">
                    <NavigationComponent/>
                    <main className="main">
                        <div className="row">
                            <div className="col-sm-12">
                                <Input placeholder="Recherche" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <Mansory
                                    className={'charactere-gallery'}
                                    elementType={'div'}
                                    options={masonryOptions}
                                    disableImagesLoaded={false}
                                    updateOnEachImageLoad={false}
                                >
                                    {this.state.gridContent}
                                </Mansory>
                            </div>
                        </div>

                    </main>
                    <BackgroundComponent />

                </div>
            </div>
        );
    }
}

export default SearchComponent;

