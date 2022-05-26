import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { templates } from '../Constants';
import { SelectFramework } from './SelectFramework';

const steps = ['SELECT FRONTEND', 'SELECT BACKEND', 'REVIEW'];

export function Home() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [combinations, setCombinations] = React.useState([]);
    const [frontends, setFrontends] = React.useState([]);
    const [backends, setBackends] = React.useState([]);
    const [frontend, setFrontend] = React.useState("");
    const [backend, setBackend] = React.useState("");
    const [platform, setPlatform] = React.useState("web");

    React.useEffect(() => {
        setCombinations(() => templates);
        handleFrontends();
        handleBackends();
    }, [combinations, frontend]);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        //let newSkipped = skipped;
        //if (isStepSkipped(activeStep)) {
        //    newSkipped = new Set(newSkipped.values());
        //    newSkipped.delete(activeStep);
        //}

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        //setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleFrontends = () => {
        combinations.map(front => {
            setFrontends((prevFrontend) => {
                const newFrontend = new Set(prevFrontend.values());
                newFrontend.add(front.frontend);
                return Array.from(newFrontend);
            });
        });
    }

    const handleBackends = () => {
        setBackends(() => {
            return combinations.filter(key => key.frontend == frontend).map((key2) => { return key2.backend })
        });
    }

    const onFrontendChange = (value) => {
        setFrontend(value);
        handleBackends();
    }
    console.log(frontend,backends);

    const onBackendChange = (value) => {
        setBackend(value);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    //if (isStepOptional(index)) {
                    //    labelProps.optional = (
                    //        <Typography variant="caption">Optional</Typography>
                    //    );
                    //}
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Start new template</Button>
                    </Box>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 5 }} align="left">Choose the frontend framework</Typography>
                        {activeStep === 0 ?
                            (<SelectFramework frameworks={{ ...frontends }} onFrameworkChange={onFrontendChange} />) :
                            activeStep === 1 ? (<SelectFramework frameworks={{ ...backends }} onFrameworkChange={onBackendChange} />) :
                                (<></>)
                        }
                
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/*{isStepOptional(activeStep) && (*/}
                        {/*    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>*/}
                        {/*        Skip*/}
                        {/*    </Button>*/}
                        {/*)}*/}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Generate' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
