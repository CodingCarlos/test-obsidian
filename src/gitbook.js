const fse = require('fs-extra');

/* Load settings (if exist) */
let settings = {
  obsidianProject: './obsidian',
  gitbookProject: './gitbook',
};

try {
  settings = require('../settings.json');
  console.log('Settings loaded from settings.json');
} catch {
  console.log('Settings not found. Using default settings');
}


/**
 *  Main function
 */
async function main() {
  console.log('Building GitBook from Obsidian.');
  
  // Copy Obsidian project to GitBook
  const copied = await copyProject();

  if (!copied) {
    console.error('Aborting.');
    return false;
  }

  /* (?) Build an index of the project files */

  /* Rename the files and folders */

  /* Make the SUMMARY.md */

  /* Convert the Obsidian syntax to markdown */

  return true
}

/* Execute the code */
main();

/**
 *  Copy obsidian project to gitbook 
 */
async function copyProject() {
  try { 
    await fse.copySync(settings.obsidianProject, settings.gitbookProject);
    console.log('> GitBook folder created.');

    await fse.remove(`${settings.gitbookProject}/.obsidian`);
    console.log('> Removed Obsidian files')

    return true;
  } catch (e) {
    console.error('> Error copying Obsidian project to GitBook folder');
    console.error(e);
    return false;
  }
  // fse.copySync(settings.obsidianProject, settings.gitbookProject, { overwrite: true }, function (err) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log("success!");
  //   }
  // });
}

/* (?) Build an index of the project files */

/* Rename the files and folders */

/* Make the SUMMARY.md */

/* Convert the Obsidian syntax to markdown */
