import * as React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { templates } from '../Constants';
import { SelectFramework } from './SelectFramework';
import { Review } from './Review';
import Alert from '@mui/material/Alert';

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
    const [alert, setAlert] = React.useState(false);

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
        if (activeStep == 0 && frontend == "") {
            setAlert(true);
            return;
        }
        if (activeStep == 1 && backend == "") {
            setAlert(true);
            return;
        }
        if (activeStep == steps.length - 1) {
            handleGenerate();
        }

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
        setFrontend("");
        setBackend("");
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
        setAlert(false);
        handleBackends();
    }

    const onBackendChange = (value) => {
        setBackend(value);
        setAlert(false);
    }

    const handleGenerate = async () => {
        //var template = new FormData();
        //template.append("Frontend", frontend);
        //template.append("Backend", backend);
        //template.append("Platform", platform);
        //console.log(template.get("Frontend"));
        //var template = {
        //    'Frontend': frontend,
        //    Backend: backend,
        //    Platform: platform
        //}
        let postdat = {
            'Frontend': frontend,
            'Backend': backend,
            'Platform': platform
        };
        console.log(postdat);
        await axios({
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            responseType: 'blob',
            url: 'template/download',
            data: postdat
            ,
        }).then(res => {
            const blob = new Blob([res.data], {
                type: 'application/zip'
            });
            saveAs(blob, frontend + "-" + backend + ".zip");
        })
            .catch(err => {
                console.log(err.message);
            });
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
                        All steps completed - Please click generate if download did not trigger
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleGenerate}>Generate</Button>
                        <Button onClick={handleReset}>Start new template</Button>
                    </Box>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        {alert?<Alert severity="error">Please select a framework</Alert>:<></> }
                    {activeStep<2 ? <Typography sx={{ mt: 3, mb: 5 }} align="left">Choose the framework</Typography>:<></>}
                        {activeStep === 0 ?
                            (<SelectFramework frameworks={{ ...frontends }} onFrameworkChange={onFrontendChange} />) :
                            activeStep === 1 ? (<SelectFramework frameworks={{ ...backends }} onFrameworkChange={onBackendChange} />) :
                                (<Review frontend={frontend} backend={backend} />)
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
