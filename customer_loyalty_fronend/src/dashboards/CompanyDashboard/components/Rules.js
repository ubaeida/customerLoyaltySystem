import { useContext, useEffect, useState } from "react";
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
import { AlertContex } from "../../../context/AlertContext";

const Rules = () => {
  const { setTitle } = useContext(TitleContext);
  const [rules, setRules] = useState([]);
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const [createRule, setCreateRule] = useState(false);
  const [deleteRule, setDeleteRule] = useState(false);
  const [ruleId, setRuleId] = useState();
  const [index, setIndex] = useState();
  const billAmountRef = useRef();
  const earndPointsRef = useRef();

  const handleClose = () => {
    setCreateRule(false);
  };

  const handleDelelteRuleClose = () => {
    setDeleteRule(false);
  };

  const getRules = async () => {
    const response = await UseFetch(
      process.env.REACT_APP_API_GET_COMPANY_RULES,
      "GET",
      null,
      { "content-Type": "application/json", authorization: `Bearer ${token}` }
    );
    if ((await response.data.length) > 0) {
      toggleOn(response.messages, response.success);
      setRules([...response.data]);
    } else {
      toggleOn("You have No rules", false);
    }
  };

  useEffect(() => {
    setTitle("Create Rules");
    getRules();
    // eslint-disable-next-line
  }, []);

  const addNewRule = async () => {
    const rule = await UseFetch(
      process.env.REACT_APP_API_ADD_RULE,
      "POST",
      {
        condition: billAmountRef.current.value,
        points: earndPointsRef.current.value,
      },
      {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    );
    if (rule.success) {
      toggleOn(rule.messages, rule.success);
      setRules([...rules, rule.data]);
      setCreateRule(false);
    } else toggleOn(rule.messages, rule.success);
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, [rules]);

  const handleDeleteRule = async () => {
    const rule = await UseFetch(
      `${process.env.REACT_APP_API_ADD_RULE}/${ruleId}`,
      "DELETE",
      null,
      {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    );
    if (rule.success) {
      toggleOn(rule.messages, rule.success);
      rules.splice(index, 1);
      setRules([...rules]);
      setDeleteRule(false);
    } else toggleOn(rule.messages, false);
  };

  return (
    <>
      {rules.length === 0 ? (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <button
              onClick={() => setCreateRule(true)}
              className="absolute right-40 flex-none bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x bold border-2 rounded-full  shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-400 "
            >
              Create New Rule
            </button>
            <div className="relative flex flex-col min-w-0 mb-8 text-center mt-10">
              Your company doesn't have any rule yet. Please press on the create
              rule to add new rules
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <button
              onClick={() => setCreateRule(true)}
              className="absolute right-40 flex-none bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x bold border-2 rounded-full  shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-400 "
            >
              Create New Rule
            </button>
            <div className="mt-12">
              {rules.map((rule, i) => (
                <div
                  key={i}
                  className=" flex flex-row mb-4 justify-center items-center "
                >
                  <div className="bg-white  border-2 px-6 py-2 rounded-full cursor-pointer hover:bg-slate-100">
                    when bill amount is {rule.condition} it will add{" "}
                    {rule.earnedPoints} standerd points and {rule.earnedPoints}{" "}
                    tiers points
                  </div>
                  <div
                    onClick={() => {
                      setDeleteRule(true);
                      setRuleId(rule.id);
                      setIndex(i);
                    }}
                    className="ml-5 cursor-pointer  hover:text-red-600"
                  >
                    <HighlightOffIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div>
        <Dialog open={createRule} onClose={handleClose}>
          <DialogTitle>Create Rule</DialogTitle>
          <div className="m-4 text-slate-700">
            <span>When amount is </span>
            <input
              type="number"
              className="w-[100px] border-x-0 border-t-0 border-b-1  mx-2"
              placeholder="Bill Amount"
              ref={billAmountRef}
              autoFocus
            />
            <span>It will add </span>
            <input
              type="number"
              className="w-[100px] border-x-0 border-t-0 border-b-1 mx-2"
              placeholder="points"
              ref={earndPointsRef}
            />
            <span>points </span>
          </div>

          <DialogActions>
            <Button sx={{ color: "#334155" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ color: "#334155" }} onClick={addNewRule}>
              Add new Rule
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteRule}
          onClose={handleDelelteRuleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this rule?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you delete this rule it will not be used to give your members
              points when they have this bill amount, However, now you can use
              the same points amount now for another rule.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ border: "0px" ,color: "#334155" }} onClick={handleDelelteRuleClose}>
              Disagree
            </Button>
            <Button sx={{ color: "#334155" }} onClick={handleDeleteRule}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Rules;
