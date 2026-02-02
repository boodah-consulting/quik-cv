# Task List for PRD Completion

## Tasks

1. **Setup Task List Infrastructure**
   - [ ] Create a markdown file to document tasks for the PRD.
   - [ ] List the tasks and subtasks required to complete the PRD.
   - [ ] Include a "Relevant Files" section to track all created and modified files.

2. **Implement Tools for MCP Server**
   - [x] Implement `read-note` tool.
   - [x] Implement `create-note` tool.
   - [ ] Implement `edit-note` tool.
   - [ ] Implement `delete-note` tool.
   - [ ] Implement `move-note` tool.
   - [ ] Implement `create-directory` tool.
   - [ ] Implement `search-note` tool.
   - [ ] Implement `add-tags` tool.
   - [ ] Implement `remove-tags` tool.
   - [ ] Implement `rename-tag` tool.
   - [ ] Implement `manage-tags` tool.
   - [ ] Implement `list-available-vaults` tool.

3. **Integrate Required Features**
   - [ ] Add multi-vault support.
   - [ ] Implement Obsidian URI integration.
   - [ ] Ensure non-blocking requests.
   - [ ] Add server status checks (e.g., health check endpoint).
   - [ ] Implement logging within the vault directory.
   - [ ] Address flakiness issues for improved reliability.
   - [ ] Ensure compliance with SON-RPC 2.0 protocol.
   - [ ] Use standard IO stream for communication.

4. **Setup Configuration**
   - [ ] Design and implement the server configuration as per the PRD JSON example.

5. **Handle Dependencies**
   - [ ] Integrate Fast MCP library for MCP protocol.
   - [ ] Ensure compatibility with Ruby and existing Obsidian plugins.
   - [ ] Implement RSpec for testing.
   - [ ] Use Zeitwerk for autoloading classes and modules.

6. **Test and Debug**
   - [ ] Write test cases for all tools and features.
   - [ ] Run the full test suite.
   - [ ] Debug and resolve any issues identified during testing.

7. **Finalise and Submit**
   - [ ] Clean up temporary files and code.
   - [ ] Commit changes using conventional commit format.
   - [ ] Update the task list file with all relevant files and tasks.

## Relevant Files

- task_list.md: Contains the list of tasks for PRD completion.

