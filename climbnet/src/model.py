import torch
from torch import nn
import torch.nn.functional as F

class ClimbNet(nn.Module):
    def __init__(self):
        super(ClimbNet, self).__init__()
        self.lin1 = nn.Linear(198, 500)
        self.bn1 = nn.BatchNorm1d(500).eval()
        self.dropout1 = nn.Dropout(0.2)
        self.lin2 = nn.Linear(500, 250)
        self.bn2 = nn.BatchNorm1d(250).eval()
        self.dropout2 = nn.Dropout(0.2)
        self.lin3 = nn.Linear(250, 100)
        self.bn3 = nn.BatchNorm1d(100).eval()
        self.dropout3 = nn.Dropout(0.2)
        self.lin4 = nn.Linear(100, 10)
        
    def forward(self, x):
        x = self.dropout1(F.relu(self.bn1(self.lin1(x).unsqueeze(0))))
        x = self.dropout2(F.relu(self.bn2(self.lin2(x))))
        x = self.dropout3(F.relu(self.bn3(self.lin3(x))))
        x = self.lin4(x)
        return x
    
file_path = 'src/climbnet_weights.pth'
model = ClimbNet()
model.load_state_dict(torch.load(file_path))

if __name__ == '__main__':
    test_input = torch.randint(low=0, high=2, size=(1, 18*11))
    test_input = test_input.to(torch.float32).flatten()

    soft_pred = model(test_input)
    hard_pred = int(soft_pred.argmax())
    grade_mapping = {
        0: 'V4',
        1: 'V5', 
        2: 'V6', 
        3: 'V7', 
        4: 'V8', 
        5: 'V9',
        6: 'V10+',
        7: 'V11',
        8: 'V12', 
        9: 'V13'
    }

    print(grade_mapping[hard_pred])