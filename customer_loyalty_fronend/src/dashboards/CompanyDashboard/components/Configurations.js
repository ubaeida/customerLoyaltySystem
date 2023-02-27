import { useContext, useEffect, useState } from "react";
import { AlertContex } from "../../../context/AlertContext";
import { TitleContext } from "../../../context/TitleContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UseFetch from "../../../custom/UseFetch";
import { AuthContext } from "../../../context/AuthContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Configurations = () => {
  const { setTitle } = useContext(TitleContext);
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const [configurations, setConfigurations] = useState([]);
  const [configurationsId, setConfigurationsId] = useState();
  const [index, setIndex] = useState();
  const [deleteConfiguration, setDeleteConfiguration] = useState(false);
  const [createTierConfiguration, setCreateTierConfiguration] = useState(false);
  const [createStandardConfiguration, setCreateStandardConfiguration] =
    useState(false);

  const keyRef = useRef();
  const valueRef = useRef();

  const getConfigurations = async () => {
    const response = await UseFetch(
      process.env.REACT_APP_API_GET_COMPANY_CONFIGURATIONS,
      "GET",
      null,
      { "content-Type": "application/json", authorization: `Bearer ${token}` }
    );
    if ((await response.data.length) > 0) {
      toggleOn(response.messages, response.success);
      setConfigurations([...response.data]);
    } else {
      toggleOn("You have no configurations", false);
    }
  };
  useEffect(() => {
    setTitle("Create Configurations");
    getConfigurations();
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setCreateTierConfiguration(false);
    setCreateStandardConfiguration(false);
  };

  const handleDelelteConfigurationClose = () => {
    setDeleteConfiguration(false);
  };

  const handleDeleteRule = async () => {
    const configuration = await UseFetch(
      `${process.env.REACT_APP_API_DELETE_CONFIGURATION}/${configurationsId}`,
      "DELETE",
      null,
      {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    );
    if (configuration.success) {
      toggleOn(configuration.messages, configuration.success);
      configurations.splice(index, 1);
      setConfigurations([...configurations]);
      setDeleteConfiguration(false);
    } else toggleOn(configuration.messages, false);
  };

  const addConfiguration = async () => {
    const configuration = await UseFetch(
      process.env.REACT_APP_API_DELETE_CONFIGURATION,
      "POST",
      {
        key: keyRef.current.value,
        value: valueRef.current.value,
      },
      {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    );
    if (configuration.success) {
      toggleOn(configuration.messages, configuration.success);
      setConfigurations([...configurations, configuration.data]);
      setCreateTierConfiguration(false);
      setCreateStandardConfiguration(false);
    } else toggleOn(configuration.messages, configuration.success);
  };

  return (
    <>
      <div className="flex justify-center flex-wrap -mx-3">
        <div className="flex-none w-full max-w-full px-3">
          <div className="absolute right-20">
            <button
              onClick={() => setCreateTierConfiguration(true)}
              className={`flex-none bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x bold border-2 rounded-full  
            shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-400 mx-3 `}
            >
              Tier Configurations
            </button>
            <button
              onClick={() => setCreateStandardConfiguration(true)}
              className={`flex-none bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x bold border-2 rounded-full  
              shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-400`}
            >
              Redemption Configurations
            </button>
          </div>
          <div className="mt-16">
            {configurations.map((config, i) => {
              if (config.key === "Minimum exchange points") {
                return (
                  <div
                    key={i}
                    className=" flex flex-row mb-4 justify-center items-center"
                  >
                    <div className="bg-white  border-2 px-6 py-2 rounded-full cursor-pointer hover:bg-slate-100">
                      When the member have {config.value} points and the
                      configuration {config.key} the member will make a
                      redemption
                    </div>
                    <div
                      onClick={() => {
                        setConfigurationsId(config.id);
                        setDeleteConfiguration(true);
                        setIndex(i);
                      }}
                      className="ml-5 cursor-pointer  hover:text-red-600"
                    >
                      <HighlightOffIcon />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    className=" flex flex-row mb-4 justify-center items-center"
                  >
                    <div className="bg-white  border-2 px-6 py-2 rounded-full cursor-pointer hover:bg-slate-100">
                      When the member have {config.value} points the membership
                      tier will be {config.key}
                    </div>
                    <div
                      onClick={() => {
                        setConfigurationsId(config.id);
                        setDeleteConfiguration(true);
                        setIndex(i);
                      }}
                      className="ml-5 cursor-pointer  hover:text-red-600"
                    >
                      <HighlightOffIcon />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <Dialog open={createStandardConfiguration} onClose={handleClose}>
          <DialogTitle>Create Configuration</DialogTitle>
          <div className="m-4  text-slate-700">
            <span> When the member have </span>
            <input
              type="number"
              className="w-[100px] border-x-0 border-t-0 border-b-1  mx-2"
              placeholder="Standard points"
              ref={valueRef}
              autoFocus
            />
            <span> standard points. </span>
            the membership will be able to make redemption
            <select
              className={`w-[225px] inline-block appearance-none rounded-md border ml-2
              border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 
              focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
              ref={keyRef}
            >
              <option>Minimum exchange points</option>
            </select>
          </div>

          <DialogActions>
            <Button sx={{ color: "#334155" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ color: "#334155" }} onClick={addConfiguration}>
              Add new configuration
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={createTierConfiguration} onClose={handleClose}>
          <DialogTitle>Create Configuration</DialogTitle>
          <div className="m-4  text-slate-700">
            <span> When the member have </span>
            <input
              type="number"
              className="w-[100px] border-x-0 border-t-0 border-b-1  mx-2"
              placeholder="tiers points"
              ref={valueRef}
              autoFocus
            />
            <span> tiers points. </span>
            the membership tier will be
            <select
              className={`w-[110px] inline-block appearance-none rounded-md border ml-2
              border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 
              focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
              ref={keyRef}
            >
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
            </select>
          </div>

          <DialogActions>
            <Button sx={{ color: "#334155" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ color: "#334155" }} onClick={addConfiguration}>
              Add new configuration
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteConfiguration}
          onClose={handleDelelteConfigurationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this configuration?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you delete this configuration it will affect the old members
              tiers , However, now you can use the same points amount now for
              another configuration.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ border: "0px", color: "#334155" }}
              onClick={handleDelelteConfigurationClose}
            >
              Disagree
            </Button>
            <Button sx={{ color: "#334155" }} onClick={handleDeleteRule}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Configurations;
