# Pen Tool Debugging and Enhancement Assignment

## Assignment Overview

Welcome to the Pen Tool Debugging and Enhancement assignment. The goal of this take-home assignment is to debug and enhance the functionality of a pen tool that replicates features from Adobe Illustrator's pen tool. Your task is to solve a series of bugs to reach a specified point total. However, we encourage you to solve all the bugs as this is a competitive position.

### Total Points Required: 25

### Instructions

1. **Accept the Assignment**:
   - Click on the invitation link provided by us to accept the assignment in GitHub Classroom.
   - Follow the prompts to create your private repository.

2. **Clone the Repository**:
   - Once your private repository is created, clone it to your local machine:
     ```sh
     git clone https://github.com/your-organization/your-repo-name.git
     cd your-repo-name
     ```

3. **Create a New Branch**:
   - Create a new branch for your work:
     ```sh
     git checkout -b your-branch-name
     ```

4. **Solve Bugs**:
   - Work on the bugs listed below. Aim to reach at least 25 points by solving the bugs. However, solving all bugs is encouraged.

5. **Track Your Progress**:
   - Use GitHub issues to document each bug you are working on. Create an issue for each bug and link the issue number in your commit messages.
     - Example issue title: "Bug 1: Red Circle Handle Doesn't Change Path into Curve"
     - Example commit message: `Fixes #1 - Red circle handle curve issue`

6. **Make Frequent Commits**:
   - Make small, incremental commits to keep track of your changes and progress:
     ```sh
     git add .
     git commit -m "Fixes #1 - Red circle handle curve issue"
     ```

7. **Push Your Branch**:
   - Push your branch to the repository:
     ```sh
     git push origin your-branch-name
     ```

8. **Notify Us**:
   - After you push your branch, please notify us by sending an email to [info@hilmi.studio] with the repo name/link and any additional comments.

## Context

This tool is designed to replicate the functionality of the pen tool from Adobe Illustrator. The primary goal is to allow users to draw lines and convert them into curves by rotating handles attached to the paths. You can watch this [YouTube video](https://youtu.be/fvHAe27c9M0?si=PLh-I0IcGd1FC1MS) to understand how our end users utilize the Illustrator pen tool.

## Bug List and Points

### Bug 1: Red Circle Handle Doesn't Change Path into Curve
**Points**: 5  
**Description**: The red circle handle should change the selected path into a curve when rotated, similar to the black circle handle. Currently, rotating the red circle handle has no effect on the path.  
**Video Example**: [Watch here](https://youtu.be/l8Was48XHC8?si=fWgBmIth_StryTk9&t=4)

### Bug 2: Trace Left Behind from Handle Rotation
**Points**: 10  
**Description**: Rotating the handles leaves behind a nodule or trace. This issue is more pronounced with different behaviors for clockwise and counterclockwise rotations.  
**Video Example**: [Watch here](https://youtu.be/l8Was48XHC8?si=fWgBmIth_StryTk9&t=16)

### Bug 3: Incorrect Grouping and Resizing of Handles
**Points**: 5   
**Description**: Rotating a black circle handle and clicking on another handle while holding Shift groups the two handles together. The second clicked handle moves with the cursor, causing an unintended resizing operation on the group.  
**Video Example**: [Watch here](https://youtu.be/l8Was48XHC8?si=fWgBmIth_StryTk9&t=36)

### Bug 4: Orientation Reset After Rotation
**Points**: 5   
**Description**: Handles do not retain their orientation after rotation. Releasing Shift and pressing it again resets the handles' orientation.  
**Video Example**: [Watch here](https://youtu.be/l8Was48XHC8?si=fWgBmIth_StryTk9&t=65)

### Bug 5: Handles Freezing and Duplicating
**Points**: 5  
**Description**: Clicking the line segment/path while holding Shift freezes the handles, causing them to remain visible after releasing Shift. This also creates duplicates when pressing Shift again.  
**Video Example**: [Watch here](https://youtu.be/l8Was48XHC8?si=fWgBmIth_StryTk9&t=83)

### Bug 6: Handles Always Selectable and Resizable
**Points**: 5  
**Description**: The circle handles are always selectable and resizable when Shift is pressed. Drawing a selection box around them selects both handles, which should not be possible.  
**Video Example**: [Watch here](https://youtu.be/l8Was48XHC8?si=fWgBmIth_StryTk9&t=102)

### Bug 7: Inaccurate Bezier Curve Math
**Points**: 15  
**Description**: The bezier curve math does not work correctly. The magnitude of the curves is insufficient, resulting in inaccurate curve representation compared to Illustrator.  
**Video Example**: [Watch here](https://youtu.be/l8Was48XHC8?si=fWgBmIth_StryTk9&t=118)

### Bug 8: Handle Length Adjustment
**Points**: 10  
**Description**: There is no option to drag the handle circles to adjust the handle line's length, which should increase the curve's magnitude.  
**Video Example**: [Watch here](https://youtu.be/l8Was48XHC8?si=fWgBmIth_StryTk9&t=118)

## Best Practices

- **Frequent Commits**: Make small, incremental commits to keep track of your changes and progress.
- **Issue Tracking**: Use GitHub issues to document each bug you are working on. Link these issues in your commit messages for better traceability.
- **Commit Messages**: Use descriptive commit messages, and reference the GitHub issues (e.g., `Fixes #1 - Red circle handle curve issue`).

We look forward to your solutions and contributions. Good luck!
