import os
from tkinter import *

from tkinter.ttk import *




window = Tk()
window.title("XML PARSE")
window.geometry("250x100")


#buil = Button(window, text="Build", command=build)




#Control
def build():
    try:
        os.system('cmd /c "start chrome indexV2.html"')
    except:
        print("You do not have chrome installed. Please install it to use this app")

buil = Button(window, text="Start", command=build)

buil.grid(column=3, row=2)
buil.place(relx=0.5, rely=0.5, anchor=CENTER)

    

window.mainloop()
