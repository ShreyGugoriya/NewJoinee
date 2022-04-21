import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import Header2 from "../Header2/Header2";
import "./Notices.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "PRE-ONBOARDING",
    description: `Collect all necessary details like Adhar card,PAN card, Passport,10th and 12th marksheets
    Address and contact details. All the details must be in correct format.Welcome kit initiated.`,
  },
  {
    label: "ONBOARDING",
    description:
      "Laptop VDI access to all new joinees, signing of Trainee document,NHPD document, Agreement papers and offer letter.",
  },
  {
    label: "POST-ONBOARDING",
    description: `All the training sessions will be lined up for them ,MCD course sessions,details of training period along with respective timelines.`,
  },
];

const Notices = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <Header2 />
      <Sidenav />
      <div className="notices">
    
        <div className="info">NOTICES - ONBOARDING STATUS</div>
        <div className="notice-flex">
          {/* Adding stepper here */}
          <div className="my-stepper">
            <Box sx={{ maxWidth: 450 }} >
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step
                    key={step.label}
                    style={{ color: "white", fontSize: "40px" }}
                  >
                    <StepLabel className="label-name" style={{ color: "red" }}>
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? "Finish" : "Continue"}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed 
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </div>
          {/* Stepper ends here */}
          

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notices;
