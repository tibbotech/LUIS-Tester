var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
    var canvas = document.createElement("canvas");
    var width = 400;
    var height = 600;
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    var player = new Player();
    var computer = new Computer();
    var ball = new Ball(200, 300);
    var image = new Image();
    image.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iRGVmYXVsdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNDUuNzI5cHgiIGhlaWdodD0iMTI1cHgiIHZpZXdCb3g9IjAgMCAyNDUuNzI5IDEyNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQ1LjcyOSAxMjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8cmVjdCBmaWxsPSIjRUM2QzJFIiB3aWR0aD0iMjQ1LjcyOSIgaGVpZ2h0PSIxMjUiLz48ZyBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTk2LjA4OSwzNC41MDFIODAuNzQzVjE5LjE2N2gxNS4zNDZWMzQuNTAxeiBNOTYuMDg5LDc3LjM0OFYzOC45ODZIODAuNzQzdjM4LjM2Mkg5Ni4wODl6IE0xOS4xNjcsMTkuMTY3djE1LjMzNUgzOC42NHY0Mi43NDVoMTguNzk1VjM0LjUwMWgxOS40NzRWMTkuMTY3SDE5LjE2N3ogTTIyNS45MDYsNTcuNDg1Yy0wLjExNywxLjkxMi0wLjQyOCwzLjgwNy0wLjk5Niw1LjYyNWMtMC41NDMsMS43NTQtMS4zMjgsMy40MzYtMi4zMiw0Ljk3OWMtMS4zNzUsMi4xMzUtMy4xNDYsMy45OTItNS4yMDksNS40M2MtMS42OTksMS4xODItMy41OTYsMi4wNzYtNS41NjYsMi42ODJjLTEuOTc1LDAuNjA1LTQuMDI1LDAuOTI0LTYuMDg2LDEuMDQ5Yy0xLjMwNywwLjA4LTIuNjE1LDAuMDgyLTMuOTIsMC4wMDRjLTEuODU3LTAuMTExLTMuNzA5LTAuMzkxLTUuNTA0LTAuODk1Yy0xLjY1LTAuNDY1LTMuMjUyLTEuMTIxLTQuNzM2LTEuOTg4Yy0xLjUyMS0wLjg4NS0yLjkyMi0xLjk5Mi00LjE1Ni0zLjI2Yy0xLjM3MS0xLjQwOC0yLjU0My0zLjAxNi0zLjQ1OS00Ljc2OGMtMC4yMjUtMC40MzItMC40MzItMC44NzMtMC42MjctMS4zMThjLTAuMDI3LDAuMDg0LTAuMDQ3LDAuMTcyLTAuMDc2LDAuMjU4Yy0wLjU0NSwxLjU1MS0xLjIzNCwyLjk5NC0yLjA2NCw0LjMzYy0wLjgzMiwxLjMzOC0xLjg3OSwyLjU2MS0zLjE0NiwzLjY3Yy0xLjI2NiwxLjExMS0yLjYyNywxLjk4LTQuMDg4LDIuNjA1Yy0xLjQ1OSwwLjYyNy0yLjk5OCwxLjA0Ny00LjYxNywxLjI1OGMtMS42MTksMC4yMTMtMy4yNSwwLjI3LTQuODk1LDAuMTdjLTEuNjQxLTAuMS0zLjIzMi0wLjM4OS00Ljc3LTAuODY5Yy0xLjUzNy0wLjQ4Mi0yLjk3OS0xLjI0Ni00LjMyOC0yLjI5NXYzLjE5N2gtMTUuMDc2di02Ljg4MWMtMC43MjMsMS4wMDYtMS41NzgsMS45NDctMi41NjgsMi44MTRjLTEuMjY2LDEuMTExLTIuNjI5LDEuOTgtNC4wOSwyLjYwNWMtMS40NTUsMC42MjctMi45OTYsMS4wNDctNC42MTQsMS4yNThjLTEuNjE4LDAuMjEzLTMuMjUxLDAuMjctNC44OTQsMC4xN3MtMy4yMzItMC4zODktNC43NzEtMC44NjljLTEuNTM3LTAuNDgyLTIuOTc5LTEuMjQ2LTQuMzI1LTIuMjk1djMuMTk3SDk5LjkyNFYxOS4xNjdoMTUuMDc4YzAsNi40NTMsMCwxMi45MDcsMC4wMDEsMTkuMzU5YzEuMjE2LTEuMDU3LDIuNTY3LTEuOTEsNC4wNTQtMi41NThjMS40ODUtMC42NDgsMy4wNDEtMS4wNzksNC42NjYtMS4yODljMS42MjctMC4yMSwzLjI2LTAuMjM0LDQuODk3LTAuMDcxYzEuNjM1LDAuMTYzLDMuMjE3LDAuNTUxLDQuNzQ3LDEuMTY0YzEuNTI3LDAuNjEzLDIuOTE2LDEuNDIyLDQuMTcsMi40MjdjMS4wMTQsMC44MSwxLjkxOCwxLjczMSwyLjcyNywyLjc1VjE5LjE2N2gxNS4wNzh2MTkuMzU5YzEuMjIxLTEuMDU3LDIuNTctMS45MSw0LjA1NS0yLjU1OGMxLjQ4Ni0wLjY0OCwzLjA0My0xLjA3OSw0LjY2OC0xLjI4OWMxLjYyNS0wLjIxLDMuMjU4LTAuMjM0LDQuODk2LTAuMDcxYzEuNjM3LDAuMTYzLDMuMjE5LDAuNTUxLDQuNzQ2LDEuMTY0YzEuNTI5LDAuNjEzLDIuOTE4LDEuNDIyLDQuMTc0LDIuNDI3YzEuMjU0LDEuMDA2LDIuMzU0LDIuMTczLDMuMjk3LDMuNWMwLjk0MywxLjMyOCwxLjY4OSwyLjc4LDIuMjM0LDQuMzU5YzAuMDQzLDAuMTIxLDAuMDc2LDAuMjQxLDAuMTE1LDAuMzYyYzAuMjAxLTAuNDQ4LDAuNDE4LTAuODg5LDAuNjUyLTEuMzJjMC44NjUtMS41OTgsMS45NDUtMy4wNzQsMy4yMDUtNC4zNjljMS4yOTUtMS4zMzIsMi43NzMtMi40NzMsNC4zNzUtMy4zODhjMC44MDMtMC40NTksMS42MzMtMC44NiwyLjQ4OC0xLjIwMmMwLjkyNi0wLjM3LDEuODc3LTAuNjcsMi44NDQtMC45MDZjMS45NjctMC40NzksMy45ODYtMC42OSw2LjAxLTAuNzI5YzIuMjQ2LTAuMDQzLDQuNDk0LDAuMTI1LDYuNjkzLDAuNTg0YzEuNzQyLDAuMzY1LDMuNDU3LDAuOTE1LDUuMDc0LDEuNjgxYzAuOTE4LDAuNDM2LDEuODAzLDAuOTQsMi42MzksMS41MmMwLjgyNCwwLjU2OSwxLjYwNCwxLjIxLDIuMzIyLDEuOTEyYzIuMDE4LDEuOTYyLDMuNTk0LDQuMzk2LDQuNjE3LDcuMDM5QzIyNS42OTcsNTAuNDcsMjI2LjExOSw1NC4wMDksMjI1LjkwNiw1Ny40ODV6IE0xMzAuODM0LDU1LjM2NmMwLTMuNjMxLTAuNzUtNi4zMzYtMi4yNDItOC4xMTVjLTEuNDkyLTEuNzc4LTMuMzM2LTIuNjY2LTUuNTM3LTIuNjY2Yy0yLjMzLDAtNC4yNTMsMC45MDMtNS43NzIsMi43MDVjLTEuNTIxLDEuODA1LTIuMjc4LDQuNTQ3LTIuMjc4LDguMjMxYzAsMy43MzgsMC43NSw2LjUwNSwyLjI1OCw4LjI5NWMxLjUwOCwxLjc4OSwzLjQsMi42ODQsNS42NzgsMi42ODRjMi4zMDIsMCw0LjE5Mi0wLjg4MSw1LjY3OC0yLjY0NkMxMzAuMDkyLDYyLjA5MiwxMzAuODM0LDU5LjI2MiwxMzAuODM0LDU1LjM2NnogTTE3MS4xNzQsNTUuMzY2YzAtMy42MzEtMC43NS02LjMzNi0yLjI0Mi04LjExNWMtMS40OTItMS43NzctMy4zMzQtMi42NjYtNS41MzctMi42NjZjLTIuMzI4LDAtNC4yNTIsMC45MDMtNS43NzEsMi43MDVjLTEuNTIxLDEuODA1LTIuMjgxLDQuNTQ3LTIuMjgxLDguMjMxYzAsMy43MzgsMC43NTIsNi41MDUsMi4yNjIsOC4yOTVjMS41MDgsMS43ODksMy4zOTgsMi42ODQsNS42NzYsMi42ODRjMi4zMDMsMCw0LjE5NS0wLjg4MSw1LjY4LTIuNjQ2QzE3MC40MzQsNjIuMDkyLDE3MS4xNzQsNTkuMjYyLDE3MS4xNzQsNTUuMzY2eiBNMjExLjUxNiw1NS41Yy0wLjAwNi0zLjYzMi0wLjc2Mi02LjMzNS0yLjI1OC04LjExYy0xLjQ5Mi0xLjc3NC0zLjM0LTIuNjU5LTUuNTQxLTIuNjU2Yy0yLjMzMiwwLjAwNS00LjI1MiwwLjkxMi01Ljc3MSwyLjcxNmMtMS41MTYsMS44MDYtMi4yNjgsNC41NTEtMi4yNjQsOC4yMzZjMC4wMDgsMy43MzgsMC43NjQsNi41MDQsMi4yNzMsOC4yODljMS41MTIsMS43ODksMy40MDQsMi42NzYsNS42ODIsMi42NzJjMi4zMDMtMC4wMDQsNC4xOTEtMC44ODUsNS42NzQtMi42NTRDMjEwLjc4NSw2Mi4yMjcsMjExLjUyMyw1OS4zOTcsMjExLjUxNiw1NS41eiIvPjxwYXRoIGQ9Ik0xOS4zMDMsOTEuMzc1aDQuOTI2djEzLjg4MWgwLjM2MmgzLjc0OVY5MS4zNzNsNC45MjYsMC4wMDJ2LTMuNTY2SDE5LjMwM1Y5MS4zNzV6IE00My41MTEsOTcuOTA0aDguNDExVjk0LjM0aC04LjQxMXYtMi45NjdsOS4wMjcsMC4wMDJ2LTMuNTY2SDM5LjM5OXYxNy40NDdoMC4zNjRoMTMuMDgydi0zLjU2NGgtOS4zMzRMNDMuNTExLDk3LjkwNEw0My41MTEsOTcuOTA0eiBNNzAuMzU0LDk4LjY1NmMtMC4yNzEsMS4xODQtMC43MTIsMi4wMDgtMS4yODMsMi41MDZjLTAuNTg1LDAuNTE2LTEuMjU3LDAuNzY2LTIuMDc4LDAuNzY4Yy0xLjEzMS0wLjAwNC0xLjk5Mi0wLjM5Ni0yLjY5Ny0xLjIyMWMtMC42NzItMC43ODctMS4wNTktMi4yMTctMS4wNTgtNC4yOTljLTAuMDAyLTEuOTU1LDAuMzg4LTMuMzE0LDEuMDc0LTQuMDk4YzAuNzEyLTAuODE2LDEuNTk1LTEuMjA5LDIuNzU0LTEuMjE1YzAuODMzLDAuMDAyLDEuNTA2LDAuMjI3LDIuMDcsMC42NzRjMC41NjIsMC40NDcsMC45MjcsMS4wNDksMS4xMTUsMS44NWwwLjA4MSwwLjM1NGw0LjA3OC0wLjk1N2wtMC4xMDUtMC4zNjdjLTAuMzk2LTEuMzc5LTAuOTkzLTIuNDY5LTEuODE4LTMuMjQyYy0xLjM1My0xLjI3NS0zLjEyNi0xLjkxNC01LjI0OS0xLjkxYy0yLjQyNy0wLjAwNC00LjQ0NCwwLjgxMS01Ljk1MSwyLjQyNmMtMS41MjEsMS42MjMtMi4yNjQsMy44OTMtMi4yNjEsNi43MzhjLTAuMDAyLDIuNjkzLDAuNzM5LDQuODc5LDIuMjQ5LDYuNDc3YzEuNDkzLDEuNTg0LDMuNDM1LDIuMzg5LDUuNzM0LDIuMzg5YzAuMDA2LDAsMC4wMTIsMCwwLjAxOSwwYzEuODU3LDAuMDAyLDMuNDMxLTAuNDU5LDQuNjczLTEuNDAyYzEuMjQ4LTAuOTQ3LDIuMTIzLTIuMzg1LDIuNjQtNC4yNjZsMC4wOTMtMC4zNGwtMy45OTEtMS4yNDZMNzAuMzU0LDk4LjY1NnogTTkxLjE1Nyw5NC4zNzVoLTUuODc1bDAuMDAyLTYuNTY2aC00LjExMnYxNy40NDdoMC4zNjVoMy43NDl2LTcuMzE2aDUuODczdjcuMzE2aDQuMTEzVjg3LjgwOWgtNC4xMTNMOTEuMTU3LDk0LjM3NUw5MS4xNTcsOTQuMzc1eiBNMTEyLjg2LDk4LjEzM2wtNi4zMy0xMC4zMjJoLTMuODI1djE3LjQ0NWgwLjM2M2gzLjQ3NFY5NS4xNTRsNi4yMjcsMTAuMTAyaDMuOTI4Vjg3LjgxMWgtMy44MzZWOTguMTMzeiBNMTMxLjk5NCw4Ny41MDJjLTEuMzk4LDAtMi42NDgsMC4yMjctMy43NDIsMC42ODljLTAuODMsMC4zNS0xLjU5MiwwLjg4My0yLjI3OSwxLjU5NGMtMC42ODYsMC43MDctMS4yMjksMS41MS0xLjYyNiwyLjRjLTAuNTM2LDEuMjIzLTAuNzk1LDIuNzA1LTAuNzk1LDQuNDQ5Yy0wLjAwNCwyLjczMiwwLjc1Nyw0LjkzOSwyLjMwMSw2LjUzNWMxLjUzOCwxLjYwMiwzLjYzMywyLjM5Niw2LjE5LDIuMzk1YzAuMDA0LDAsMC4wMDgsMCwwLjAxLDBjMi41MjEsMCw0LjYtMC44MDMsNi4xMzEtMi40MDRjMS41NDUtMS42MDcsMi4zMDUtMy44MzQsMi4zMDMtNi42MDVjMC4wMDItMi43OTEtMC43NjItNS4wMzMtMi4zMTgtNi42NDNDMTM2LjYxNyw4OC4zMDEsMTM0LjUyOSw4Ny40OTYsMTMxLjk5NCw4Ny41MDJ6IE0xMzUuMDY4LDEwMC42MjVjLTAuODAxLDAuOTAyLTEuNzc3LDEuMzM4LTMuMDMzLDEuMzQyYy0xLjI1Ni0wLjAwNC0yLjIzOC0wLjQ0NS0zLjA1NC0xLjM1NGMtMC43ODktMC44OTEtMS4yMTUtMi4yMzYtMS4yMTctNC4wOTJjMC0xLjg4NywwLjQxNy0zLjIzOCwxLjE4Ni00LjEwNGMwLjc4Ny0wLjg4MywxLjc3OS0xLjMxMywzLjA4Ny0xLjMxOGMxLjMwOSwwLjAwNiwyLjI5NSwwLjQzMiwzLjA3LDEuMjk5YzAuNzU0LDAuODU0LDEuMTY0LDIuMTk5LDEuMTY0LDQuMDc2QzEzNi4yNzEsOTguMzc5LDEzNS44NDgsOTkuNzQ0LDEzNS4wNjgsMTAwLjYyNXogTTE1MS4yNDQsODcuOTQ1aC00LjExMXYxNy4zMTFoMC4zNjNoMTIuMTI1di0zLjU2NGgtOC4zNzdWODcuOTQ1eiBNMTczLjc1OCw4Ny41Yy0xLjQwMiwwLTIuNjUyLDAuMjI5LTMuNzQ0LDAuNjkzYy0wLjgzLDAuMzQ4LTEuNTkyLDAuODgzLTIuMjc5LDEuNTkyYy0wLjY4NiwwLjcwOS0xLjIzLDEuNTEtMS42MjUsMi40MDJjLTAuNTM3LDEuMjIxLTAuNzk3LDIuNzA1LTAuNzk3LDQuNDQ3Yy0wLjAwMiwyLjczMiwwLjc1Niw0LjkzOCwyLjMwMSw2LjUzNWMxLjUzNywxLjYwMiwzLjYzNSwyLjM5OCw2LjE5MSwyLjM5NWMwLjAwOCwwLDAuMDE0LDAsMC4wMjEsMGMyLjUxNiwwLDQuNTktMC44MDMsNi4xMjEtMi40MDZjMS41NDUtMS42MDUsMi4zMDUtMy44MzQsMi4zMDMtNi42MDJjMC4wMDItMi43OTMtMC43NjQtNS4wMzUtMi4zMi02LjY0NUMxNzguMzgxLDg4LjMwMywxNzYuMjkxLDg3LjQ5NiwxNzMuNzU4LDg3LjV6IE0xNzYuODMsMTAwLjYyNWMtMC44MDEsMC45MDItMS43NzcsMS4zMzYtMy4wMzMsMS4zNDJjLTEuMjU2LTAuMDA2LTIuMjQtMC40NDMtMy4wNTMtMS4zNTVjLTAuNzk1LTAuODkxLTEuMjE5LTIuMjM2LTEuMjE5LTQuMDg4YzAtMS44ODksMC40MTYtMy4yNCwxLjE4Ni00LjEwNWMwLjc4NS0wLjg4MywxLjc3OS0xLjMxMywzLjA4OC0xLjMxOGMxLjMwNywwLjAwNiwyLjI5MywwLjQzMiwzLjA2OCwxLjI5OWMwLjc1NiwwLjg1NCwxLjE3LDIuMTk3LDEuMTY4LDQuMDc2QzE3OC4wMzMsOTguMzc3LDE3Ny42MTMsOTkuNzQ0LDE3Ni44MywxMDAuNjI1eiBNMTk2LjYyMyw5OS4xMzVoMC4zNjVoMy40OTh2MS41ODJjLTAuNDQ3LDAuMzI4LTAuOTgsMC42MTUtMS42MDIsMC44NTdjLTAuNjcyLDAuMjYyLTEuMzM2LDAuMzkxLTEuOTk0LDAuMzkxYy0xLjM0OC0wLjAwNC0yLjM3Ny0wLjQ1NS0zLjE5Ny0xLjM3NWMtMC44MDEtMC45MDItMS4yMzQtMi4zMDUtMS4yMzQtNC4yNTRjMC4wMDQtMS43OTcsMC40MjQtMy4wOTIsMS4yMTEtMy45NDVjMC43OTktMC44NTcsMS44NS0xLjI4NywzLjI1Mi0xLjI5MWMwLjkxNCwwLDEuNjM3LDAuMjIxLDIuMjE5LDAuNjQzYzAuNTg0LDAuNDMyLDAuOTc1LDEuMDAyLDEuMTkxLDEuNzZsMC4wOSwwLjMxNGw0LjA0My0wLjc0bC0wLjA4LTAuMzY3Yy0wLjM0NC0xLjYxMS0xLjE0Ni0yLjkwNi0yLjM4OS0zLjgzYy0xLjI1Ni0wLjkzNC0yLjk1OS0xLjM4MS01LjA4LTEuMzgxYy0xLjY0MSwwLTMuMDM1LDAuMjgzLTQuMTc0LDAuODc3Yy0xLjQ2NywwLjc1Ni0yLjU5NCwxLjg1NC0zLjM1NywzLjI3MWMtMC43NTgsMS40MTYtMS4xMzcsMy4wMjktMS4xMzcsNC44MjhjMCwxLjY1NCwwLjMzNiwzLjIwMywxLjAxNiw0LjYxOWMwLjY4LDEuNDM0LDEuNzE1LDIuNTQ5LDMuMDc4LDMuMzE4YzEuMzYxLDAuNzcxLDIuOTUxLDEuMTUsNC43NSwxLjE1YzEuNDIyLDAsMi44MjQtMC4yNyw0LjIwMy0wLjgwM2MxLjM3MS0wLjUyNywyLjQzOC0xLjE0NiwzLjE5Ny0xLjg3N2wwLjEwNy0wLjEwOXYtNy4yMDVoLTcuOTc1djMuNTY2SDE5Ni42MjN6IE0yMjEuODExLDg3LjgxMWwtMy42NDgsNi4yNjJsLTMuNzExLTYuMjYyaC00Ljg2N2w2LjQzNCwxMC4xNXY3LjI5M2gwLjM2NWgzLjc0NnYtNy4yNzFsNi40MzQtMTAuMTc0aC00Ljc1MlY4Ny44MTF6Ii8+PC9nPjwvc3ZnPg==";

    var keysDown = {};

    var render = function () {
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);
        player.render();
        computer.render();
        ball.render();
    };

    var update = function () {
        player.update();
        computer.update(ball);
        ball.update(player.paddle, computer.paddle);
    };

    var step = function () {
        update();
        render();
        animate(step);
    };

    function Paddle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }

    Paddle.prototype.render = function () {
        //context.fillStyle = "#fff";
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(image, this.x, this.y, this.width, this.height);
    };

    Paddle.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
        this.x_speed = x;
        this.y_speed = y;
        if (this.x < 0) {
            this.x = 0;
            this.x_speed = 0;
        } else if (this.x + this.width > 400) {
            this.x = 400 - this.width;
            this.x_speed = 0;
        }
    };

    function Computer() {
        this.paddle = new Paddle(175, 10, 60, 30);
    }

    Computer.prototype.render = function () {
        this.paddle.render();
    };

    Computer.prototype.update = function (ball) {
        var x_pos = ball.x;
        var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
        if (diff < 0 && diff < -4) {
            diff = -5;
        } else if (diff > 0 && diff > 4) {
            diff = 5;
        }
        this.paddle.move(diff, 0);
        if (this.paddle.x < 0) {
            this.paddle.x = 0;
        } else if (this.paddle.x + this.paddle.width > 400) {
            this.paddle.x = 400 - this.paddle.width;
        }
    };

    function Player() {
        this.paddle = new Paddle(175, 560, 60, 30);
    }

    Player.prototype.render = function () {
        this.paddle.render();
    };

    Player.prototype.update = function () {
        for (var key in keysDown) {
            var value = Number(key);
            if (value == 37) {
                this.paddle.move(-4, 0);
            } else if (value == 39) {
                this.paddle.move(4, 0);
            } else {
                this.paddle.move(0, 0);
            }
        }
    };

    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.y_speed = 3;
    }

    Ball.prototype.render = function () {
        context.beginPath();
        context.arc(this.x, this.y, 5, 2 * Math.PI, false);
        context.fillStyle = "#fff";
        context.fill();
    };

    Ball.prototype.update = function (paddle1, paddle2) {
        this.x += this.x_speed;
        this.y += this.y_speed;
        var top_x = this.x - 5;
        var top_y = this.y - 5;
        var bottom_x = this.x + 5;
        var bottom_y = this.y + 5;

        if (this.x - 5 < 0) {
            this.x = 5;
            this.x_speed = -this.x_speed;
        } else if (this.x + 5 > 400) {
            this.x = 395;
            this.x_speed = -this.x_speed;
        }

        if (this.y < 0 || this.y > 600) {
            this.x_speed = 0;
            this.y_speed = 3;
            this.x = 200;
            this.y = 300;
        }

        if (top_y > 300) {
            if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
                this.y_speed = -3;
                this.x_speed += (paddle1.x_speed / 2);
                this.y += this.y_speed;
            }
        } else {
            if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
                this.y_speed = 3;
                this.x_speed += (paddle2.x_speed / 2);
                this.y += this.y_speed;
            }
        }
    };

    document.body.appendChild(canvas);
    animate(step);

    window.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });

    window.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
    });