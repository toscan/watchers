import './layout.css';
import Fraction from 'fraction.js'
import React from 'react'
import ReactDom from 'react-dom'

class Angle extends React.Component {
    handleMouseDown = (e) => {
        console.log('down');
        //this.props.dragStart(e, this.props.index)
    };

    render() {
        const {
            angle,
            radius,
            index,
            isDragging,
            ...props,
        } = this.props

        const sketchHalfSize = props.sketchSize / 2

        const numerator = angle.numerator !== "" ? angle.numerator : 1
        const denominator = angle.denominator !== "" ? angle.denominator : 1

        const radians = (numerator / denominator) * Math.PI
        const cosRadius = sketchHalfSize + Math.cos(radians) * (props.circleRadius - radius)
        const sinRadius = sketchHalfSize - Math.sin(radians) * (props.circleRadius - radius)

        const angleRadius = 40
        const cosAngleRadius = sketchHalfSize + Math.cos(radians) * angleRadius
        const sinAngleRadius = sketchHalfSize - Math.sin(radians) * angleRadius

        return (
            <g className="ad-SketchAngle">
                <path
                    className="ad-SketchAngle-angle"
                    d={
                        "M " + (sketchHalfSize + angleRadius) + " " + sketchHalfSize +
                        " A " + angleRadius + " " + angleRadius + ", " +
                        (Math.sin(radians) < 0 ? "0, 1, 0" : "0, 0, 0") + ", " +
                        cosAngleRadius + " " + sinAngleRadius +
                        " L " + sketchHalfSize + " " + sketchHalfSize +
                        " Z"
                    } />

                <g className="ad-SketchAngle-trigo">
                    <line
                        className="ad-SketchAngle-cos"
                        x1={ sketchHalfSize }
                        y1={ sinRadius }
                        x2={ cosRadius }
                        y2={ sinRadius } />
                    <line
                        className="ad-SketchAngle-sin"
                        x1={ cosRadius }
                        y1={ sketchHalfSize }
                        x2={ cosRadius }
                        y2={ sinRadius } />
                </g>


                <line
                    className="ad-SketchAngle-line"
                    x1={ sketchHalfSize }
                    y1={ sketchHalfSize }
                    x2={ cosRadius }
                    y2={ sinRadius } />

                <circle
                    className={
                        "ad-SketchAngle-dot" +
                        (isDragging === index ? " is-dragging" : "")
                    }
                    onMouseDown={ this.handleMouseDown }
                    cx={ cosRadius }
                    cy={ sinRadius }
                    r={ 6 } />

                <circle
                    className={
                        "ad-SketchAngle-dot" +
                        (isDragging === index ? " is-dragging" : "")
                    }
                    onMouseDown={ this.handleMouseDown }
                    cx={ cosRadius }
                    cy={ sinRadius }
                    x="25" y="25"
                    r={ 3 } />

            </g>
        )
    }
}

class Sketch extends React.Component {
    render() {
        const {
            angles,
            ...props,
        } = this.props
        this.state = {
            radiusToPrint : [],
            circles : []
        }
        const sketchHalfSize = props.sketchSize / 2

        angles.map((circle, index) => {
            this.state.radiusToPrint.push(circle.values.map((angle, index) => {
                return (<Angle
                    angle={ angle }
                    radius={circle.radius}
                    index={ index }
                    { ...props } />)
            }))
        })





        return (
            <svg
                className="ad-Sketch"
                viewBox={ "0 0 " + props.sketchSize + " " + props.sketchSize }>
                <g className="ad-Sketch-base">


                    {
                        angles.map((circle, index) => {
                            this.state.circles.push(<circle
                                className="ad-Sketch-circle"
                                cx={ sketchHalfSize }
                                cy={ sketchHalfSize }
                                r={ props.circleRadius - circle.radius} />)
                        })
                    }

                    {this.state.circles}

                </g>

                <g className="ad-Sketch-angles">
                    { this.state.radiusToPrint }
                </g>
            </svg>
        )
    }
}

class Icon extends React.Component {
    render() {
        let path

        switch (this.props.name) {
            case "clear":
                path = "M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                break;

            case "add":
                path = "M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"
                break;
        }

        return (
            <svg
                className="ad-Icon"
                viewBox="0 0 1024 1024">
                <path d={ path } />
            </svg>
        )
    }
}

class Button extends React.Component {
    render() {
        const {
            type,
            size,
            icon,
            children,
            ...props,
        } = this.props

        return (
            <button
                className={
                    "ad-Button" +
                    (type ? " ad-Button--" + type : "") +
                    (size ? " ad-Button--" + size : "")
                }
                { ...props }
                type="button">
                { icon && (<Icon name={ icon } />) }
                {
                    children && (
                        <span className="ad-Button-text">
                            { children }
                        </span>
                    )
                }
            </button>
        )
    }
}

class FormGroup extends React.Component {
    handleNumerator = (e) => {
        this.props.updateNumerator(this.props.indexAngle, e.target.value,this.props.circleId)
    };

    handleDenominator = (e) => {
        this.props.updateDenominator(this.props.indexAngle, e.target.value,this.props.circleId)
    };

    handleClick = (e) => {
        e.preventDefault()
        this.props.deleteFormGroup(this.props.indexCircle,this.props.indexAngle)
    };

    render() {
        return (
            <div className="ad-FormGroup">
                <div className="ad-FormGroup-color"></div>

                <div className="ad-FormMath">
                    <div className="ad-FormMath-frac">
                        <div className="ad-FormMath-n">
                            <input
                                className="ad-FormInput"
                                ref="numerator"
                                value={ this.props.angle.numerator }
                                onChange={ this.handleNumerator }
                                type="text" />
                        </div>

                        <div className="ad-FormMath-n">
                            <input
                                className="ad-FormInput"
                                ref="denominator"
                                value={ this.props.angle.denominator }
                                onChange={ this.handleDenominator }
                                type="text" />
                        </div>
                    </div>

                    <div className="ad-FormMath-formula">
                        π
                    </div>
                </div>

                <div className="ad-FormGroup-action">
                    <Button
                        onClick={ this.handleClick }
                        type="cancel"
                        size="mini"
                        id  = {this.props.indexCircle}
                        icon="clear" />
                </div>
            </div>
        )
    }
}

class Form extends React.Component {
    componentDidUpdate() {
        const n = ReactDom.findDOMNode(this.refs.groups)

        if (this.props.shouldScroll) {
            n.scrollTop = n.scrollHeight
        }
    }

    handleClick = (e) => {
        e.preventDefault()

        this.props.addFormGroup(e.target.id)
    };

    handleBlur = (e) => {
        this.props.blurAddButton()
    };

    render() {
        const {
            angles,
            index,
            circleId,
            addFormGroup,
            ...props,
        } = this.props

        let groups = angles.map((angle, indexAngle) => {
            return (
                <FormGroup
                    angle={ angle }
                    indexCircle={ index }
                    circleId={ circleId }
                    indexAngle={ indexAngle }
                    { ...props } />
            )
        })

        return (
            <form className="ad-Form">
                <div
                    className="ad-Form-groups"
                    ref="groups">
                    { groups }
                </div>

                <div className="ad-Form-actions">
                    <Button
                        onClick={ this.handleClick }
                        onBlur={ this.handleBlur }
                        type="primary"
                        size="full"
                        id = {this.props.index}
                        icon="add">
                        Add angle
                    </Button>
                </div>
            </form>
        )
    }
}

class Trigonometry extends React.Component {
    state = {
        isDragging: false,
        shouldScroll: false,
        forms : [],
        angles: [
            {
                'id' : 'circle0',
                'radius' : 0,
                'values': [
                    {
                        numerator: 7,
                        denominator: 10,
                    },
                    {
                        numerator: 3,
                        denominator: 2,
                    },
                    {
                        numerator: 1,
                        denominator: 9,
                    },
                ]
            },
            {
                'id' : 'circle1',
                'radius' : 25,
                'values': [
                    {
                        numerator: 8,
                        denominator: 10,
                    },
                    {
                        numerator: 1,
                        denominator: 2,
                    },
                    {
                        numerator: 5,
                        denominator: 5,
                    },
                ]
            },

            {
                'id' : 'circle2',
                'radius' : 40,
                'values': [
                    {
                        numerator: 8,
                        denominator: 2,
                    },
                    {
                        numerator: 6,
                        denominator: 9,
                    },
                    {
                        numerator: 5,
                        denominator: 1,
                    },
                ]
            },
        ]
    };

    updateNumerator = (index, numerator,circleId) => {
        if (numerator !== "") {
            numerator = parseFloat(numerator)
        }

        const angles = this.state.angles.map((circle, circleTypeIndex) => {
            if(circle.id === circleId){
                let angles = circle.values.map((angle, angleIndex) => {
                    if (angleIndex === index) {
                        numerator = (numerator !== "" && isNaN(numerator)) ? angle.numerator : numerator
                        return {
                            numerator: numerator,
                            denominator: angle.denominator,
                        }
                    }
                    return angle
                })
                delete this.state.angles[circleTypeIndex]['values'];
                this.state.angles[circleTypeIndex]['values'] = angles
            }
        })
        this.setState({
            angles : this.state.angles
        })

    };

    updateDenominator = (index, denominator,circleId) => {
        if (denominator !== "") {
            denominator = parseFloat(denominator)

            if (denominator === 0) {
                denominator = 1
            }
        }
        const angles = this.state.angles.map((circle, circleTypeIndex) => {
            if(circle.id === circleId){
                let angles = circle.values.map((angle, angleIndex) => {
                    if (angleIndex === index) {
                        denominator = (denominator !== "" && isNaN(denominator)) ? angle.denominator : denominator
                        return {
                            numerator: angle.numerator,
                            denominator: denominator,
                        }
                    }
                    return angle
                })
                delete this.state.angles[circleTypeIndex]['values'];
                this.state.angles[circleTypeIndex]['values'] = angles
            }
        })
        this.setState({
            angles : this.state.angles
        })
    };

    blurAddButton = () => {
        this.setState({
            shouldScroll: false,
        })
    };

    addFormGroup = (index) => {
        const numerator = 0,
            denominator = 1,
            angles = this.state.angles

        angles[index].values.push({ numerator, denominator })

        this.setState({
            angles,
            shouldScroll: true,
        })
    };

    deleteFormGroup = (indexCircle,indexAngle) => {
        let angles = this.state.angles
        console.log(indexCircle);

        delete angles[indexCircle].values[indexAngle]

        this.setState({ angles })
    };

    drag = (e) => {
        let i = this.state.isDragging
        let sketch = ReactDom.findDOMNode(this.refs.sketch).getBoundingClientRect()

        if (i !== false) {
            const sketchHalfSize = this.props.sketchSize / 2

            let angles = this.state.angles,
                x = (e.pageX - sketch.left) - sketchHalfSize,
                y = sketchHalfSize - (e.pageY - sketch.top),
                rad = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
                sine = y / rad,
                cosine = x / rad,
                theta

            theta = Math.acos(cosine)

            if (sine < 0) {
                theta = 2 * Math.PI - theta
            }

            const f = new Fraction((theta / Math.PI).toFixed(1))

            angles[i] = {
                numerator: f.n,
                denominator: f.d,
            }

            this.setState({ angles })
        }
    };

    dragStart = (e, index) => {
        e.preventDefault()

        this.setState({
            isDragging: index,
        })
    };

    dragEnd = (e) => {
        this.setState({
            isDragging: false,
        })
    };

    displayForm(){
        var form = [];
        this.state.angles.forEach((angle,index) => {
            form.push(<div className="ad-Trigonometry-form">
                <Form
                    angles={ angle.values }
                    index={ index }
                    circleId={ angle.id }
                    shouldScroll={ this.state.shouldScroll }
                    updateNumerator={ this.updateNumerator.bind(this) }
                    updateDenominator={ this.updateDenominator.bind(this) }
                    blurAddButton={ this.blurAddButton.bind(this) }
                    addFormGroup={ this.addFormGroup.bind(this,index) }
                    deleteFormGroup={ this.deleteFormGroup.bind(this) } />
            </div>);
        })
        return form;
    }


    render() {
        return (
            <div>
                <div className="ad-App-head">
                    <h1 className="ad-App-title">
                        Trigonometry Helper
                    </h1>

                    <div className="ad-App-hint">
                        Type values to move an angle or drag it directly on the scheme.
                    </div>
                </div>

                <div
                    className="ad-Trigonometry"
                    //onMouseUp={ this.dragEnd }
                    //onMouseMove={ this.drag }
                    >
                    <div className="ad-Trigonometry-svg">
                        <Sketch
                            ref="sketch"
                            angles={ this.state.angles }
                            //drag={ this.drag }
                            //dragStart={ this.dragStart }
                            //dragEnd={ this.dragEnd }
                            //isDragging={ this.state.isDragging }
                            { ...this.props } />
                    </div>
                    {
                        this.displayForm()
                    }
                </div>

                <div className="ad-App-foot">
                    <a href="https://twitter.com/a_dugois">
                        Follow me on Twitter
                    </a>
                </div>
            </div>
        )
    }
}

export default Trigonometry ;


