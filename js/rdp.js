const { shell } = require('electron');
const findChrome = require('chrome-finder');
const Shell = require('node-powershell');

const exec = require('child_process').exec;

const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true,
});

// function to check if a process is running
const isRunning = (query, cb) => {
  let platform = process.platform;
  let cmd = '';
  switch (platform) {
    case 'win32': cmd = `tasklist`; break;
    case 'darwin': cmd = `ps -ax | grep ${query}`; break;
    case 'linux': cmd = `ps -A`; break;
    default: break;
  }
  exec(cmd, (err, stdout, stderr) => {
    cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
  });
}

// Install google chrome if not installed already, otherwise just run the application.
const initApp = () => {
  // Try to log the chrome filepath
  try {
    let chromePath = findChrome();
    console.log(chromePath)

    // if chrome is not installed, catch error and download and install chrome
  } catch (err) {

    // classes for the button blocks (meet, hangouts, werkplek...)
    const block = document.querySelectorAll('.block');
    const blockFirstRun = document.querySelector('.block--firstrun');

    // if chrome is not yet installed, hide the button blocks
    block.forEach(el => {
      el.classList.add('hidden');
    });

    // if chrome is not yet installed, show spinner ('Getting chrome...')
    blockFirstRun.classList.remove('hidden');

    // download and install google chrome with powershell command
    firstRun();

    // interval that checks if chrome has been installed every 5 seconds
    const checkIfChromeisInstalled = setInterval(function () {
      let chromePath = findChrome(); // Will trow an "chrome not installed error in the console", just wait for the install to complete.

      if (!chromePath) {
        console.log(false)
        console.log('...installing chrome')
        findChrome();

      } else {
        // When installation is complete, log path to chrome to the console
        console.log(chromePath)

        //  Show the button blocks (meet, hangouts, werkplek...) CSS
        block.forEach(el => {
          el.classList.remove('hidden');
        });

        // hide spinner block CSS
        blockFirstRun.classList.add('hidden');
        console.log('cleared interval!');
        clearInterval(checkIfChromeisInstalled);
      }
      // isRunning('chrome.exe', (status) => {
      //   console.log(status); // true|false

      //   // If chrome is running, clear the interval,
      //   if (status === true) {
      // clearInterval(checkIfChromeisRunning);

      // //  show correct button blocks
      // block.forEach(el => {
      //   el.classList.remove('hidden');
      // });

      // // hide spinner block
      // blockFirstRun.classList.add('hidden');
      // console.log('cleared interval!');
      //   }
      // })
    }, 5000);
  }
};

// Buttons
const rdp = () => {
  shell.openPath(`${__dirname}/rdp.vbs`);
};

const meet = () => {
  shell.openPath(`${__dirname}/google-meet.vbs`);
};

const hangouts = () => {
  shell.openPath(`${__dirname}/google-hangouts.vbs`);
};

const outlook = () => {
  shell.openPath(`${__dirname}/outlook.vbs`);
};

const shutdown = () => {
  shell.openPath(`${__dirname}/shutdown.vbs`);
};

// Get chrome via powershell
const firstRun = () => {
  ps.addCommand(
    '$Path = $env:TEMP; $Installer = "chrome_installer.exe"; Invoke-WebRequest "https://dl.google.com/chrome/install/latest/chrome_installer.exe" -OutFile $Path$Installer; PowerShell -NoProfile -ExecutionPolicy Unrestricted -Command "& {Start-Process -FilePath $Path$Installer -Args "/install" -Verb RunAs -Wait; Remove-Item $Path$Installer}"'
  );
  ps.invoke()
    .then((output) => {
      console.log(output);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Initialize the application
initApp();
