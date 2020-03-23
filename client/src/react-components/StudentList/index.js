import React from "react";
import { uid } from "react-uid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import Student from "./../Student";

// Importing actions/required methods
import { getStudents } from "../../actions/student";

import "./../../App.css";
import "./styles.css";

/* Component for the List of Students */
class StudentList extends React.Component {

    // student list state
    state = {
        studentList: []
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    onClick={() => getStudents(this)}
                    className="student-list__button app__horizontal-center"
                    variant="contained"
                >
                    Get Students
                </Button>
                <Table className="student-list">
                    <TableBody>
                        {this.state.studentList.map(student => (
                            <Student
                                key={uid(
                                    student
                                )} /* unique id required to help React render more efficiently when we delete students. */
                                student={student}
                            />
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default StudentList;
